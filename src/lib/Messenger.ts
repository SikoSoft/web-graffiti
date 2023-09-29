import { connection } from "websocket";
import { Client } from "./Client";
import { Controller } from "./Controller";
import {
  LineMessage,
  Message,
  MessageEvent,
  MessagePayload,
  SetContextMessage,
} from "./MessageSpec";
import pino from "pino";

declare type MessageHander = () => void;

export interface MessengerOptions {
  //client: Client;
  logger: pino.Logger;
  controller: Controller;
}

export class Messenger {
  //private client: Client;
  private logger: pino.Logger;
  private controller: Controller;

  constructor({ logger, controller }: MessengerOptions) {
    //this.client = client;
    this.logger = logger;
    this.controller = controller;
  }

  handle(client: Client, rawMessage: Message) {
    const messageHandlers: Record<string, MessageHander> = {
      [MessageEvent.SET_CONTEXT]: () =>
        this.handleSetContext(rawMessage as SetContextMessage),
      [MessageEvent.LINE]: () => this.handleLine(rawMessage as LineMessage),
    };
    if (
      rawMessage.event in messageHandlers &&
      typeof messageHandlers[rawMessage.event] === "function"
    ) {
      this.logger.debug(
        `Event '${rawMessage.event}' is defined; running callback...`
      );
      messageHandlers[rawMessage.event]();
    } else {
      this.logger.debug(
        `Event '${rawMessage.event}' does not have a callback defined`
      );
    }
  }

  handleSetContext(message: SetContextMessage) {}

  handleLine(message: LineMessage) {}

  broadcast(message: any, ignoreClientId: string | undefined = "") {
    this.controller.clients
      .filter((client) => !ignoreClientId || client.id !== ignoreClientId)
      .forEach((client) => {
        this.send(client.connection, message);
      });
  }

  send(connection: connection, message: Message) {
    connection.sendUTF(JSON.stringify(message));
  }
}
