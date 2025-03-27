import pino from "pino";
import { v4 } from "uuid";
import { connection } from "websocket";
import { ChannelConfig } from "../../spec/Config";
import { Client, SimpleClientOptions } from "./Client";
import { Messenger } from "./Messenger";
import { MessageEvent, Message } from "../../spec/MessageSpec";
import { Wall } from "./Wall";
import { Config } from "./Config";
import { Access } from "./Access";
import { Middleware, MiddlewareTrigger } from "./Middleware";

/*
function delegateSource() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    for (let i = 0; i < storageDelegates.length; i++) {
      const storageDelegate = storageDelegates[i];
      const delegateMethods = Object.getOwnPropertyNames(
        Object.getPrototypeOf(storageDelegate),
      );
      if (delegateMethods.includes(propertyKey)) {
        const methodName = propertyKey as keyof StorageSchema;
        if (!storageDelegate || !storageDelegate[methodName]) {
          return;
        }
        descriptor.value = storageDelegate[methodName];
      }
    }
  };
}
  */

function upgradeClient() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const client = originalMethod.apply(this, args);
      client.upgraded = true;
      console.log("########## CLIENT UPGRADE IN DECORATOR #########");
      //this.logger.info(`Client ${client.id} has been upgraded`);
      return client;
    };

    return descriptor;
  };
}

export interface ChannelStats {
  totalClients: number;
  upTime: Date;
  lastConnectionTime: Date | undefined;
  lastDisconnectionTime: Date | undefined;
  totalIncomingMessages: number;
  totalOutgoingMessages: number;
}

export interface ChannelOptions {
  logger: pino.Logger;
  config: ChannelConfig;
  wall: Wall;
  access: Access;
  middleware: Middleware;
}
export class Channel {
  private logger: pino.Logger;
  public id: number;
  public config: ChannelConfig;
  public clients: Client[];
  public wall: Wall;
  public messenger: Messenger;
  public stats: ChannelStats;
  public paintPerTick: number;
  public access: Access;
  private middleware: Middleware;

  constructor({ logger, config, wall, access, middleware }: ChannelOptions) {
    const clients: Client[] = [];
    this.logger = logger;
    this.messenger = new Messenger({ channel: this, config, logger });
    this.config = config;
    this.id = config.id;
    this.clients = clients;
    this.wall = wall;
    this.access = access;
    this.middleware = middleware;
    this.stats = {
      get totalClients() {
        return clients.length;
      },
      upTime: new Date(),
      lastConnectionTime: undefined,
      lastDisconnectionTime: undefined,
      totalIncomingMessages: 0,
      totalOutgoingMessages: 0,
    };
    this.paintPerTick =
      (this.config.paintRefill / this.config.paintTime) *
      this.config.paintVolume;
  }

  async registerClient(
    config: Config,
    ip: string,
    connection: connection,
    accessToken: string | null
  ): Promise<Client> {
    const id = v4();

    this.logger.info(
      `Establishing connection for new client ${id} (channel: ${this.id})`
    );

    const clientOptions = await this.middleware.runHandlers(
      MiddlewareTrigger.CLIENT_CONNECTED,
      {
        config,
        ip,
        connection,
        accessToken,
        client: {
          id,
          ip,
          joinTime: Date.now(),
          paint: this.config.paintVolume,
          role: config.defRole,
          tokenProvided: !!accessToken,
          tokenAccepted: false,
        },
      }
    );

    const client = new Client({
      ...clientOptions.client,
      config,
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
        totalClients: this.stats.totalClients,
        tokenProvided: client.tokenProvided,
        tokenAccepted: client.tokenAccepted,
      },
    });

    this.announceOthersToNewClient(client);

    this.announceNewClientToOthers(client);

    this.stats.lastConnectionTime = new Date();

    this.logger.info({ ...clientOptions.client }, "Client connected");

    return client;
  }

  announceNewClientToOthers(newClient: Client) {
    this.broadcast(
      {
        event: MessageEvent.NEW_CLIENT,
        payload: {
          id: newClient.id,
          ctx: newClient.ctx,
          totalClients: this.stats.totalClients,
          join: newClient.joinTime,
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
            totalClients: this.stats.totalClients,
            join: client.joinTime,
          },
        });
      });
  }

  async removeClient(client: Client): Promise<void> {
    this.logger.info(`Client ${client.id} disconnected`);
    this.clients.splice(this.clients.indexOf(client), 1);
    await this.broadcast({
      event: MessageEvent.CLIENT_DISCONNECTED,
      payload: {
        id: client.id,
        totalClients: this.stats.totalClients,
      },
    });
    if (this.clients.length === 0 || client.hasUnsavedEdits) {
      await this.syncWall();
    }
    this.stats.lastDisconnectionTime = new Date();
  }

  async syncWall() {
    await this.wall.sync();
    this.clients.forEach((client) => {
      client.hasUnsavedEdits = false;
    });
  }

  async broadcast(
    message: Message,
    ignoreClientId: string | undefined = ""
  ): Promise<void> {
    for (let i = 0; i < this.clients.length; i++) {
      const client = this.clients[i];
      if (client.id !== ignoreClientId) {
        await this.messenger.send(client.connection, message);
      }
    }
  }

  async announceClientUpdated() {
    await this.broadcast({
      event: MessageEvent.DEV_CLIENT_UPDATE,
      payload: {},
    });
  }
}
