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
  private logger: pino.Logger;
  private controller: Controller;

  constructor({ logger, controller }: MessengerOptions) {
    this.logger = logger;
    this.controller = controller;
  }

  handle(client: Client, rawMessage: Message) {
    const messageHandlers: Record<string, MessageHander> = {
      [MessageEvent.SET_CONTEXT]: () =>
        this.handleSetContext(client, rawMessage as SetContextMessage),
      [MessageEvent.LINE]: () =>
        this.handleLine(client, rawMessage as LineMessage),
    };
    if (rawMessage.event in messageHandlers) {
      messageHandlers[rawMessage.event]();
    } else {
      this.logger.debug(
        `Event '${rawMessage.event}' does not have a callback defined`
      );
    }
  }

  handleSetContext(client: Client, message: SetContextMessage) {
    this.controller.wall.setContext(message.payload.ctx);
    client.ctx = message.payload.ctx;
  }

  handleLine(client: Client, message: LineMessage) {
    const [x1, y1, x2, y2] = message.payload.line;
    for (const key in client.ctx) {
      //ctx[key] = client.ctx[key];
      //this.logger.debug(`Set context '${key}' to '${client.ctx[key]}'`);
    }
    let paintUsed;
    if (client.hasInfinitePaint()) {
      paintUsed = 0;
    } else {
      paintUsed = this.controller.wall.ctx.lineWidth * Math.PI;
    }

    let newVolume = client.paint - paintUsed;
    let exceeded = false;
    if (newVolume < 0) {
      newVolume = 0;
      exceeded = true;
    }
    if (!exceeded) {
      this.logger.debug(`Line: x1: ${x1}, y1: ${y1}, x2: ${x2}, y2: ${y2}`);
      client.paint = newVolume;
      this.controller.wall.ctx.beginPath();
      this.controller.wall.ctx.moveTo(x1, y1);
      this.controller.wall.ctx.lineTo(x2, y2);
      this.controller.wall.ctx.stroke();
      this.controller.wall.ctx.closePath();
      this.send(client.connection, {
        event: MessageEvent.PAINT,
        payload: {
          paint: newVolume,
        },
      });
      this.broadcast(
        {
          event: MessageEvent.LINE,
          payload: {
            id: client.id,
            line: message.payload.line,
          },
        },
        client.id
      );
    }
  }

  broadcast(message: any, ignoreClientId: string | undefined = "") {
    this.controller.clients
      .filter((client) => !ignoreClientId || client.id !== ignoreClientId)
      .forEach((client) => {
        this.send(client.connection, message);
      });
  }

  send(connection: connection, message: Message) {
    //this.logger.debug(`Send message: ${JSON.stringify(message)}`);
    connection.sendUTF(JSON.stringify(message));
  }
}
