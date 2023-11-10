import pino from "pino";
import { v4 } from "uuid";
import { connection } from "websocket";
import { ChannelConfig } from "../../spec/Config";
import { Client } from "./Client";
import { Messenger } from "./Messenger";
import { MessageEvent } from "../../spec/MessageSpec";
import { Wall } from "./Wall";
import { Config } from "./Config";

export interface ChannelStats {}

export interface ChannelOptions {
  logger: pino.Logger;
  messenger: Messenger;
  config: ChannelConfig;
  wall: Wall;
}
export class Channel {
  private logger: pino.Logger;
  public id: number;
  public config: ChannelConfig;
  public clients: Client[];
  public wall: Wall;
  private messenger: Messenger;

  constructor({ logger, messenger, config, wall }: ChannelOptions) {
    this.logger = logger;
    this.messenger = messenger;
    this.config = config;
    this.id = config.id;
    this.clients = [];
    this.wall = wall;
  }

  registerClient(config: Config, ip: string, connection: connection): Client {
    const id = v4();

    this.logger.info(`New connection for ${id} (channel: ${this.id})`);

    const client = new Client({
      config,
      id,
      joinTime: Date.now(),
      role: 0,
      ip,
      paint: config.paintVolume,
      connection,
      channel: this,
    });

    this.clients.push(client);

    this.messenger.send(connection, {
      event: MessageEvent.WELCOME,
      payload: {
        id,
        width: config.width,
        height: config.height,
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
    if (this.clients.length === 0 || client.hasUnsavedEdits) {
      this.syncWall();
    }
  }

  syncWall() {
    this.wall.sync();
    this.clients.forEach((client) => {
      client.hasUnsavedEdits = false;
    });
  }

  getTotalClients(): number {
    return this.clients.length;
  }
}
