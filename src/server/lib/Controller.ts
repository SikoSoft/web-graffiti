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
    this.config.channels.forEach((channelConfig) => {
      const wall = this.getWall(channelConfig.id);
      if (wall) {
        this.channels.push({
          id: channelConfig.id,
          config: channelConfig,
          clients: [],
          wall,
        });
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
        const client = this.registerClient(
          channel,
          request.remoteAddress,
          connection
        );

        connection.on("message", (message) => {
          if (message.type === "utf8") {
            this.messenger.handle(client, JSON.parse(message.utf8Data));
          }
        });

        connection.on("close", () => {
          this.removeClient(client);
        });
      }
    });

    httpServer.listen(this.config.server.webSocketPort, () => {
      this.logger.debug(
        `WebSocket server is listening on port ${this.config.server.webSocketPort}`
      );
    });
  }

  registerClient(channel: Channel, ip: string, connection: connection): Client {
    const id = v4();

    this.logger.info(`New connection for ${id} (channel: ${channel.id})`);

    const client = new Client({
      config: this.config,
      id,
      joinTime: Date.now(),
      role: 0,
      ip,
      paint: this.config.paintVolume,
      connection,
      channel,
    });

    this.logger.debug(`Channel exists for new client: ${channel.id}`);
    channel.clients.push(client);

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
      newClient.channel.id,
      {
        event: MessageEvent.NEW_CLIENT,
        payload: {
          id: newClient.id,
          ctx: newClient.ctx,
        },
      },
      newClient.id
    );
  }

  announceOthersToNewClient(newClient: Client) {
    const channel = this.getChannel(newClient.channel.id);
    if (channel) {
      channel.clients
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
  }

  removeClient(client: Client) {
    this.logger.info(`Client ${client.id} disconnected`);
    const channel = this.getChannel(client.channel.id);
    if (channel) {
      channel.clients.splice(channel.clients.indexOf(client), 1);
      if (channel.clients.length === 0 || client.hasUnsavedEdits) {
        this.syncWall(channel.wall);
      }
    }
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
      this.walls.forEach((wall) => {
        this.syncWall(wall);
      });
    }, this.config.server.autoSave);
  }

  syncWall(wall: Wall) {
    wall.sync();
    const channel = this.getChannel(wall.channelConfig.id);
    if (channel) {
      channel.clients.forEach((client) => {
        client.hasUnsavedEdits = false;
      });
    }
  }

  getTotalClients(): number {
    return this.channels.reduce(
      (acc, channel) => acc + channel.clients.length,
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
