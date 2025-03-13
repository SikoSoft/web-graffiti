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

    this.logger.info(`New connection for ${id} (channel: ${this.id})`);

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
        },
      }
    );

    console.log(
      "#######################",
      JSON.stringify(clientOptions.client, null, 2)
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
      },
    });

    this.announceOthersToNewClient(client);

    this.announceNewClientToOthers(client);

    this.stats.lastConnectionTime = new Date();

    return client;
  }

  announceNewClientToOthers(newClient: Client) {
    this.broadcast(
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
    this.stats.lastDisconnectionTime = new Date();
  }

  syncWall() {
    this.wall.sync();
    this.clients.forEach((client) => {
      client.hasUnsavedEdits = false;
    });
  }

  broadcast(message: Message, ignoreClientId: string | undefined = "") {
    this.clients
      .filter((client) => !ignoreClientId || client.id !== ignoreClientId)
      .forEach((client) => {
        this.messenger.send(client.connection, message);
      });
  }
}
