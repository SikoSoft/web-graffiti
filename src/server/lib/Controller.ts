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
import { Environment } from "./Environment";
import { Channel } from "./Channel";

export interface ControllerOptions {
  env: Environment;
  config: Config;
  logger: pino.Logger;
  walls: Wall[];
}

export class Controller {
  public env: Environment;
  private config: Config;
  public channels: Channel[];
  private paintPerTick: number;
  private logger: pino.Logger;
  public walls: Wall[];

  private httpApp: express.Express;
  private router: express.Router;
  private messenger: Messenger;

  constructor({ env, config, logger, walls }: ControllerOptions) {
    this.env = env;
    this.config = config;
    this.paintPerTick =
      (this.config.server.paintRefill / this.config.paintTime) *
      this.config.paintVolume;
    this.channels = [];
    this.logger = logger;
    this.walls = walls;
    this.httpApp = express();
    this.router = express.Router();
    this.messenger = new Messenger({ controller: this, config, logger });
  }

  init() {
    this.registerChannels();

    this.registerRoutes();

    this.startWebServer();

    this.startWebSocketServer();

    this.startTickTimers();
  }

  registerChannels() {
    this.channels = [];
    this.config.channels.forEach((config) => {
      const wall = this.getWall(config.id);
      if (wall) {
        this.channels.push(
          new Channel({
            logger: this.logger,
            messenger: this.messenger,
            config,
            wall,
          })
        );
      }
    });
  }

  registerRoutes() {
    this.httpApp.use(express.static(this.env.rootPath.client));

    this.router.get("/config/:channelId", (req, res) => {
      const { server, channels, roles, ...rest } = this.config;
      const channel = this.getChannel(parseInt(req.params.channelId));
      res.send(
        JSON.stringify({
          ...rest,
          channel: channel?.config,
        })
      );
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
      const url = new URL(request.resource, request.origin);

      const channelId = url.searchParams.has("channelId")
        ? parseInt(
            url.searchParams.get("channelId") || `${this.config.defChannel}`
          )
        : this.config.defChannel;

      const channel = this.getChannel(channelId);

      if (channel) {
        const client = channel.registerClient(
          this.config,
          request.remoteAddress,
          connection
        );

        connection.on("message", (message) => {
          if (message.type === "utf8") {
            this.messenger.handle(client, JSON.parse(message.utf8Data));
          }
        });

        connection.on("close", () => {
          channel.removeClient(client);
        });
      }
    });

    httpServer.listen(this.config.server.webSocketPort, () => {
      this.logger.debug(
        `WebSocket server is listening on port ${this.config.server.webSocketPort}`
      );
    });
  }

  startTickTimers() {
    setInterval(() => {
      this.channels.forEach((channel) => {
        channel.clients.forEach((client) => {
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
      });
    }, this.config.server.paintRefill);

    setInterval(() => {
      this.logger.debug(
        `There are ${this.getTotalClients()} clients currently connected`
      );
    }, this.config.server.status);

    setInterval(() => {
      this.channels.forEach((channel) => {
        channel.syncWall();
      });
    }, this.config.server.autoSave);
  }

  getTotalClients(): number {
    return this.channels.reduce(
      (acc, channel) => acc + channel.getTotalClients(),
      0
    );
  }

  getChannel(channelId: number): Channel | undefined {
    return this.channels.find((channel) => channel.id === channelId);
  }

  getWall(channelId: number): Wall | undefined {
    return this.walls.find((wall) => wall.channelConfig.id === channelId);
  }
}
