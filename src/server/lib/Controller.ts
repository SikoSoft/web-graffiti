import pino from "pino";
import { v4 } from "uuid";
import http from "http";
import https from "https";
import { connection, server } from "websocket";
import express from "express";
import { Config } from "./Config";
import { Client } from "./Client";
import { Wall } from "./Wall";
import { Messenger } from "./Messenger";
import { MessageEvent } from "../../spec/MessageSpec";
import path from "path";
import { Environment } from "./Environment";

export interface ControllerOptions {
  env: Environment;
  config: Config;
  logger: pino.Logger;
  wall: Wall;
}

export class Controller {
  public env: Environment;
  private config: Config;
  public clients: Client[];
  private paintPerTick: number;
  private logger: pino.Logger;
  public wall: Wall;

  private httpApp: express.Express;
  private router: express.Router;
  private messenger: Messenger;

  constructor({ env, config, logger, wall }: ControllerOptions) {
    this.env = env;
    this.config = config;
    this.paintPerTick =
      (this.config.server.paintRefill / this.config.paintTime) *
      this.config.paintVolume;
    this.clients = [];
    this.logger = logger;
    this.wall = wall;
    this.httpApp = express();
    this.router = express.Router();
    this.messenger = new Messenger({ controller: this, config, logger });
  }

  init() {
    this.registerRoutes();

    this.startWebServer();

    this.startWebSocketServer();

    this.startTickTimers();
  }

  registerRoutes() {
    this.httpApp.use(express.static(this.env.rootPath.client));
    this.httpApp.use(
      "/spec/",
      express.static(path.join(__dirname, `../../spec`))
    );
    this.httpApp.use(
      "/wc/",
      express.static(path.join(__dirname, `../../../dist`))
    );
    this.httpApp.use(express.static(this.env.rootPath.config));
    //this.httpApp.use(express.static(this.wcRoot));

    this.router.get("/config.json", (req, res) => {
      const { server, roles, ...rest } = this.config;
      res.send(JSON.stringify(rest));
    });
    this.httpApp.use(this.router);
  }

  startWebServer() {
    (this.config.server.secure
      ? https.createServer(this.config.secureConfig, this.httpApp)
      : http.createServer(this.config.secureConfig, this.httpApp)
    ).listen(this.config.server.webPort, () => {
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
        mode: client.role.mode,
      },
    });

    this.announceOthersToNewClient(client);

    this.announceNewClientToOthers(client);

    return client;
  }

  announceNewClientToOthers(newClient: Client) {
    this.messenger.broadcast(
      {
        event: "newClient",
        id: newClient.id,
      },
      newClient.id
    );
  }

  announceOthersToNewClient(newClient: Client) {
    this.clients
      .filter((client) => client.id !== newClient.id)
      .forEach((client) => {
        this.messenger.send(newClient.connection, {
          event: MessageEvent.NEW_CLIENT,
          payload: {
            id: client.id,
            ctx: client.ctx,
          },
        });
      });
  }

  removeClient(client: Client) {
    this.logger.info(`Client ${client.id} disconnected`);
    this.clients.splice(this.clients.indexOf(client), 1);
    if (this.clients.length === 0) {
      this.wall.sync();
    }
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

    setInterval(() => {
      this.wall.sync();
    }, this.config.server.autoSave);
  }
}
