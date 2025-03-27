import {
  ClientDisconnectedMessage,
  DevClientUpdateMessage,
  LineMessage,
  Message,
  MessageEvent,
  NewClientMessage,
  PaintMessage,
  SetContextMessage,
  WallResetMessage,
  WelcomeMessage,
} from "../../spec/MessageSpec";
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
  //private disconnectPromise: Promise<void>;
  private disconnectResolve:
    | ((value: void | PromiseLike<void>) => void)
    | undefined;
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
      [MessageEvent.SET_CONTEXT]: (message) =>
        this.handleSetContext(message.payload as SetContextMessage["payload"]),
      [MessageEvent.CLIENT_DISCONNECTED]: (message) =>
        this.handleClientDisconnected(
          message.payload as ClientDisconnectedMessage["payload"]
        ),
      [MessageEvent.WALL_RESET]: (message) => {
        this.handleWallReset(message.payload as WallResetMessage["payload"]);
      },
    };
  }

  async init() {
    return this.connect();
  }

  async connect(_accessToken = ""): Promise<void> {
    let accessToken = _accessToken;
    if (!accessToken) {
      accessToken = sessionStorage.getItem("accessToken") || "";
    }
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(
        `${this.wg.config.wsServer}?channelId=${this.wg.channelId}&accessToken=${accessToken}`
      );
      this.ws.onopen = () => {
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
        console.log("connection close callback");
        this.wg.editor.disable();
        this.wg.input.disable();
        //this.disconnectPromise = Promise.resolve();
        this.connectionPromise = null;
        this.connected = false;
        this.disconnectResolve && this.disconnectResolve();
      };
    });
  }

  async disconnect(): Promise<void> {
    console.log("disconnect");
    return new Promise((resolve, reject) => {
      this.disconnectResolve = resolve;
      this.ws.close();
    });
  }

  async reconnect(accessToken = ""): Promise<void> {
    console.log("reconnect", this.ws.OPEN, this.connected);
    if (this.ws.OPEN) {
      await this.disconnect();
    }
    console.log("reconnect", this.ws.OPEN, this.connected);
    await this.connect(accessToken);
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
    this.wg.registerClient(this.wg.createClient(payload.id));
    this.wg.menu.setTotalClients(payload.totalClients);
    if (payload.ctx) {
      this.wg.setClientContext(payload.id, payload.ctx);
    }
    this.wg.notify("New client connected");
  }

  handleClientDisconnected(payload: ClientDisconnectedMessage["payload"]) {
    this.wg.removeClient(payload.id);
    this.wg.menu.setTotalClients(payload.totalClients);
    this.wg.notify("Client disconnected");
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

  handleWallReset(payload: WallResetMessage["payload"]) {
    this.wg.render.reset();
    this.wg.notify("The wall has been reset");
  }
}
