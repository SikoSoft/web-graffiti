import {
  DevClientUpdateMessage,
  LineMessage,
  Message,
  MessageEvent,
  NewClientMessage,
  PaintMessage,
  SetContextMessage,
  WelcomeMessage,
} from "../spec/MessageSpec";
import { WebGraffiti } from "./WebGraffiti";

declare type MessageHander = (message: Message) => void;

export interface SocketOptions {
  wg: WebGraffiti;
}

export class Socket {
  private wg: WebGraffiti;
  private ws!: WebSocket;
  private sentPerSecond: number;
  private receivedPerSecond: number;
  public connected: boolean;
  private connectionPromise: Promise<void> | null;
  private messageHandlers: Record<string, MessageHander>;

  constructor({ wg }: SocketOptions) {
    this.wg = wg;
    this.sentPerSecond = 0;
    this.receivedPerSecond = 0;
    this.connected = false;
    this.connectionPromise = null;

    this.messageHandlers = {
      [MessageEvent.WELCOME]: (message) =>
        this.handleWelcome(message.payload as WelcomeMessage["payload"]),
      [MessageEvent.NEW_CLIENT]: (message) =>
        this.handleNewClient(message.payload as NewClientMessage["payload"]),
      [MessageEvent.LINE]: (message) =>
        this.handleLine(message.payload as LineMessage["payload"]),
      [MessageEvent.PAINT]: (message) =>
        this.handlePaint(message.payload as PaintMessage["payload"]),
      [MessageEvent.DEV_CLIENT_UPDATE]: (message) =>
        this.handleDevClientUpdate(
          message.payload as DevClientUpdateMessage["payload"]
        ),
    };
  }

  async init() {
    return this.connect();
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wg.config.wsServer);
      this.ws.onopen = () => {
        this.wg.editor.enable();
        this.wg.input.enable();
        this.connected = true;
        this.connectionPromise = null;
        resolve();
      };
      this.ws.onerror = () => {
        reject();
      };
      this.ws.onmessage = (message) => {
        if (this.connected) {
          this.handleMessage(JSON.parse(message.data));
        }
      };
      this.ws.onclose = () => {
        this.wg.editor.disable();
        this.wg.input.disable();
        this.connectionPromise = null;
        this.connected = false;
      };
    });
  }

  sendMessage(message: Message): void {
    this.setSentPerSecond(this.sentPerSecond + 1);
    setTimeout(() => {
      this.setSentPerSecond(this.sentPerSecond - 1);
    }, 1000);
    this.ws.send(JSON.stringify(message));
  }

  handleMessage(message: Message) {
    if (message.event in this.messageHandlers) {
      this.messageHandlers[message.event](message);
    } else {
      console.log(`Event '${message.event}' does not have a callback defined`);
    }
  }

  handleWelcome(payload: WelcomeMessage["payload"]) {
    this.wg.handleWelcome(payload);
  }

  handleNewClient(payload: NewClientMessage["payload"]) {
    this.wg.registerClient(payload.id);
    if (payload.ctx) {
      this.wg.setClientContext(payload.id, payload.ctx);
    }
  }

  handleSetContext(payload: SetContextMessage["payload"]) {
    if (payload.id) {
      this.wg.setClientContext(payload.id, payload.ctx);
    }
  }

  handleLine(payload: LineMessage["payload"]) {
    this.wg.render.drawLine(
      payload.line,
      this.wg.clients.filter((client) => client.id === payload.id)[0].ctx
    );
  }

  handlePaint(payload: PaintMessage["payload"]) {
    this.wg.client.setPaint(payload.paint);
  }

  handleDevClientUpdate(payload: DevClientUpdateMessage["payload"]) {
    this.wg.reload();
  }

  setSentPerSecond(number: number): void {
    this.sentPerSecond = number;
    this.wg.useNetworkMonitor &&
      this.wg.networkMonitor.setSentPerSecond(number);
  }

  setReceivedPerSecond(number: number): void {
    this.receivedPerSecond = number;
    this.wg.useNetworkMonitor &&
      this.wg.networkMonitor.setReceivedPerSecond(number);
  }
}
