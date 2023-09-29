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

export interface ControllerOptions {
  staticRoot: string;
  config: Config;
  logger: pino.Logger;
  wall: Wall;
}

interface xxconnection {
  client: Client;
}

/*
export interface ClientConnection extends connection {
  client: Client;
}
*/

export class Controller {
  private staticRoot: string;
  private config: Config;
  public clients: Client[];
  private logger: pino.Logger;
  private wall: Wall;
  private secureConfig: https.ServerOptions;
  private httpApp: express.Express;
  private router: express.Router;
  private messenger: Messenger;

  constructor({ config, staticRoot, logger, wall }: ControllerOptions) {
    this.staticRoot = staticRoot;
    this.config = config;
    this.clients = [];
    this.logger = logger;
    this.wall = wall;
    this.secureConfig = {};
    this.httpApp = express();
    this.router = express.Router();
    this.messenger = new Messenger({ controller: this, logger });
  }

  init() {
    this.registerRoutes();

    this.initSecureConfig();

    this.startWebServer();

    this.startWebSocketServer();
  }

  registerRoutes() {
    this.httpApp.use(express.static(this.staticRoot));
    //app.use(express.static(path.join(__dirname, "/dist")));

    this.router.get("/config.json", (req, res) => {
      const { server, roles, ...rest } = this.config;
      res.send(JSON.stringify(rest));
    });
    this.httpApp.use(this.router);
  }

  initSecureConfig() {
    this.secureConfig = this.config.server.secure
      ? {
          key: fs.readFileSync(this.config.server.secureKey),
          cert: fs.readFileSync(this.config.server.secureCert),
        }
      : {};
  }

  startWebServer() {
    (this.config.server.secure ? https : http)
      .createServer(this.secureConfig, this.httpApp)
      .listen(this.config.server.webPort, () => {
        this.logger.info(
          `Web server listening on port ${this.config.server.webPort}`
        );
      });
  }

  startWebSocketServer() {
    const httpServer = this.config.server.secure
      ? https.createServer(this.secureConfig)
      : http.createServer();

    new server({
      httpServer,
    }).on("request", (request) => {
      const connection = request.accept(null, request.origin);

      const client = this.registerClient(request.remoteAddress, connection);

      this.clients.push(client);

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
      id,
      joinTime: Date.now(),
      role: 0,
      ip,
      paint: this.config.paintVolume,
      connection,
    });

    this.clients.push(client);
    //connection.client = client;

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
}
