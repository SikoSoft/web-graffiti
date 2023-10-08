import { Message } from "../spec/MessageSpec";
import { WebGraffiti } from "./WebGraffiti";

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

  constructor({ wg }: SocketOptions) {
    this.wg = wg;
    this.sentPerSecond = 0;
    this.receivedPerSecond = 0;
    this.connected = false;
    this.connectionPromise = null;
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
          this.handleMessage(message); //
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

  handleMessage(message: MessageEvent<any>): void {
    this.setReceivedPerSecond(this.receivedPerSecond + 1);
    setTimeout(() => {
      this.setReceivedPerSecond(this.receivedPerSecond - 1);
    }, 1000);
    const json = JSON.parse(message.data);
    switch (json.event) {
      case "welcome":
        this.wg.client.id = json.payload.id;
        this.wg.client.setPaint(json.payload.paint);
        this.wg.client.setDelta(Date.now() - json.payload.join);
        this.wg.render.setActualWidth(json.payload.width);
        this.wg.render.setActualHeight(json.payload.height);
        break;
      case "newClient":
        this.wg.registerClient(json.payload.id);
        if (json.ctx) {
          this.wg.setClientContext(json.payload.id, json.payload.ctx);
        }
        break;
      case "setContext":
        this.wg.setClientContext(json.payload.id, json.payload.ctx);
        break;
      case "line":
        this.wg.render.drawLine(
          json.payload.line,
          this.wg.clients.filter((client) => client.id === json.payload.id)[0]
            .ctx
        );
        break;
      case "paint":
        this.wg.client.setPaint(json.payload.paint);
        break;
    }
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
