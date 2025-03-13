import pino from "pino";
import { Config } from "./Config";
import { connection } from "websocket";
import { SimpleClientOptions } from "./Client";

export enum MiddlewareType {
  ACCESS = "access",
}

export enum MiddlewareTrigger {
  CLIENT_CONNECTED = "clientConnected",
}

export interface MiddlewarePayload {
  [MiddlewareTrigger.CLIENT_CONNECTED]: {
    config: Config;
    ip: string;
    connection: connection;
    accessToken: string | null;
    client: SimpleClientOptions;
  };
}
export interface MiddlewareBinding {
  [MiddlewareTrigger.CLIENT_CONNECTED]: (
    payload: MiddlewarePayload[MiddlewareTrigger.CLIENT_CONNECTED]
  ) => Promise<MiddlewarePayload[MiddlewareTrigger.CLIENT_CONNECTED]>;
}

export type MiddlewareHandlers = Record<
  MiddlewareTrigger,
  MiddlewareBinding[MiddlewareTrigger][]
>;

export interface MiddlewareOptions {
  logger: pino.Logger;
}

export class Middleware {
  logger: pino.Logger;
  handlers: MiddlewareHandlers = Object.values(MiddlewareTrigger).reduce(
    (acc, trigger) => {
      acc[trigger] = [];
      return acc;
    },
    {} as MiddlewareHandlers
  );

  constructor({ logger }: MiddlewareOptions) {
    this.logger = logger;
  }

  register(
    type: MiddlewareTrigger,
    handler: MiddlewareBinding[MiddlewareTrigger]
  ) {
    this.logger.info(`Registering middleware handler for ${type}`);
    this.handlers[type].push(handler);
  }

  async runHandlers<T extends MiddlewareTrigger>(
    trigger: MiddlewareTrigger,
    payload: MiddlewarePayload[T]
  ): Promise<MiddlewarePayload[T]> {
    this.logger.info(`Running middleware handlers for ${trigger}`);
    //this.logger.debug(payload);

    await Promise.resolve();

    if (this.handlers[trigger].length === 0) {
      this.logger.info(`No middleware handlers for ${trigger}`);
      return payload;
    }

    return await this.handlers[trigger][0](payload);

    /*
    return {
      id: "123",
      ip: "",
      joinTime: 123,
      paint: 123,
      role: 123,
    }
*/
  }
}
