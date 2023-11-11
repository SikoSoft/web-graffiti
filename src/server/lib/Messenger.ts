import { connection } from "websocket";
import { Client } from "./Client";
import {
  LineMessage,
  Message,
  MessageEvent,
  RefillMessage,
  SetContextMessage,
  SetRoleMessage,
} from "../../spec/MessageSpec";
import pino from "pino";
import { Channel } from "./Channel";
import { ChannelConfig } from "../../spec/Config";

declare type MessageHander = (client: Client, message: Message) => void;

export interface MessengerOptions {
  logger: pino.Logger;
  channel: Channel;
  config: ChannelConfig;
}

export class Messenger {
  private logger: pino.Logger;
  private channel: Channel;
  private config: ChannelConfig;
  private messageHandlers: Record<string, MessageHander>;

  constructor({ logger, channel, config }: MessengerOptions) {
    this.logger = logger;
    this.channel = channel;
    this.config = config;

    this.messageHandlers = {
      [MessageEvent.SET_CONTEXT]: (client, message) =>
        this.handleSetContext(
          client,
          message.payload as SetContextMessage["payload"]
        ),
      [MessageEvent.LINE]: (client, message) =>
        this.handleLine(client, message.payload as LineMessage["payload"]),
      [MessageEvent.SET_ROLE]: (client, message) =>
        this.handleSetRole(
          client,
          message.payload as SetRoleMessage["payload"]
        ),
      [MessageEvent.REFILL]: (client, message) =>
        this.handleRefill(client, message.payload as RefillMessage["payload"]),
    };
  }

  handle(client: Client, message: Message) {
    this.channel.stats.totalIncomingMessages++;
    if (message.event in this.messageHandlers) {
      this.messageHandlers[message.event](client, message);
    } else {
      this.logger.debug(
        `Event '${message.event}' does not have a callback defined`
      );
    }
  }

  handleSetContext(client: Client, payload: SetContextMessage["payload"]) {
    client.channel.wall.setContext(payload.ctx);
    client.ctx = payload.ctx;
    this.channel.broadcast(
      {
        event: MessageEvent.SET_CONTEXT,
        payload: {
          id: client.id,
          ctx: payload.ctx,
        },
      },
      client.id
    );
  }

  handleLine(client: Client, payload: LineMessage["payload"]) {
    const [x1, y1, x2, y2] = payload.line;

    client.channel.wall.setContext(client.ctx);

    let paintUsed;
    if (client.hasInfinitePaint()) {
      paintUsed = 0;
    } else {
      paintUsed = client.channel.wall.ctx.lineWidth * Math.PI;
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
      client.hasUnsavedEdits = true;
      client.channel.wall.drawLine(x1, y1, x2, y2);
      this.send(client.connection, {
        event: MessageEvent.PAINT,
        payload: {
          paint: newVolume,
        },
      });

      this.channel.broadcast(
        {
          event: MessageEvent.LINE,
          payload: {
            id: client.id,
            line: payload.line,
          },
        },
        client.id
      );
    }
  }

  handleSetRole(client: Client, payload: SetRoleMessage["payload"]) {
    client.setRole(payload.role);
  }

  handleRefill(client: Client, payload: RefillMessage["payload"]) {
    client.refillPaint();
    this.send(client.connection, {
      event: MessageEvent.PAINT,
      payload: { paint: this.config.paintVolume },
    });
  }

  send(connection: connection, message: Message) {
    this.channel.stats.totalOutgoingMessages++;
    connection.sendUTF(JSON.stringify(message));
  }
}
