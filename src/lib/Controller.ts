import "dotenv/config";
import pino from "pino";
import { v4 } from "uuid";
import http from "http";
import https from "https";
import { connection, server, w3cwebsocket } from "websocket";
import fs from "fs";
import express from "express";
import { Config } from "./Config";
import { Client } from "./Client";
import { Wall } from "./Wall";
import { Messenger } from "./Messenger";
import { MessageEvent } from "./MessageSpec";

const STATIC_ROOT = process.env.STATIC_ROOT || "";

export interface ControllerOptions {
  config: Config;
  logger: pino.Logger;
  wall: Wall;
}

export class Controller {
  private config: Config;
  public clients: Client[];
  private paintPerTick: number;
  private logger: pino.Logger;
  public wall: Wall;

  private httpApp: express.Express;
  private router: express.Router;
  private messenger: Messenger;

  constructor({ config, logger, wall }: ControllerOptions) {
    this.config = config;
    this.paintPerTick =
      (this.config.server.paintRefill / this.config.paintTime) *
      this.config.paintVolume;
    this.clients = [];
    this.logger = logger;
    this.wall = wall;
    this.httpApp = express();
    this.router = express.Router();
    this.messenger = new Messenger({ controller: this, logger });
  }

  init() {
    this.registerRoutes();

    this.startWebServer();

    this.startWebSocketServer();

    this.startTickTimers();
  }

  registerRoutes() {
    this.httpApp.use(express.static(STATIC_ROOT));
    //app.use(express.static(path.join(__dirname, "/dist")));

    this.router.get("/config.json", (req, res) => {
      const { server, roles, ...rest } = this.config;
      res.send(JSON.stringify(rest));
    });
    this.httpApp.use(this.router);
  }

  startWebServer() {
    (this.config.server.secure ? https : http)
      .createServer(this.config.secureConfig, this.httpApp)
      .listen(this.config.server.webPort, () => {
        this.logger.info(
          `Web server listening on port ${this.config.server.webPort}`
        );
      });
  }

  startWebSocketServer() {
    const httpServer = this.config.server.secure
      ? https.createServer(this.config.secureConfig)
      : http.createServer();

    new server({
      httpServer,
    }).on("request", (request) => {
      const connection = request.accept(null, request.origin);

      const client = this.registerClient(request.remoteAddress, connection);

      connection.on("message", (message) => {
        if (message.type === "utf8") {
          this.messenger.handle(client, JSON.parse(message.utf8Data));
        }
      });

      connection.on("close", () => {
        this.removeClient(client);
      });
    });

    httpServer.listen(this.config.server.webSocketPort, () => {
      this.logger.debug(
        `WebSocket server is listening on port ${this.config.server.webSocketPort}`
      );
    });
  }

  registerClient(ip: string, connection: connection): Client {
    const id = v4();

    this.logger.info(`New connection for ${id}`);

    const client = new Client({
      config: this.config,
      id,
      joinTime: Date.now(),
      role: 0,
      ip,
      paint: this.config.paintVolume,
      connection,
    });

    this.clients.push(client);

    this.messenger.send(connection, {
      event: MessageEvent.WELCOME,
      payload: {
        id,
        width: this.config.width,
        height: this.config.height,
        paint: client.paint,
        join: client.joinTime,
      },
    });

    return client;
  }

  removeClient(client: Client) {
    this.logger.info(`Client ${client.id} disconnected`);
    this.clients.splice(this.clients.indexOf(client), 1);
    this.wall.sync();
  }

  startTickTimers() {
    setInterval(() => {
      this.clients.forEach((client) => {
        if (client.paint < this.config.paintVolume) {
          const newPaint =
            client.paint + this.paintPerTick < this.config.paintVolume
              ? client.paint + this.paintPerTick
              : this.config.paintVolume;
          client.paint = newPaint;
          this.messenger.send(client.connection, {
            event: MessageEvent.PAINT,
            payload: { paint: client.paint },
          });
        }
      });
    }, this.config.server.paintRefill);

    setInterval(() => {
      this.logger.debug(
        `There are ${this.clients.length} clients currently connected`
      );
    }, this.config.server.status);
  }
}