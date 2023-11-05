import { Config } from "./Config";
import { Editor } from "./Editor";
import { Socket } from "./Socket.js";
import { NetworkMonitor } from "./NetworkMonitor";
import { Render } from "./Render";
import { Loader } from "./Loader";
import { Input } from "./Input";
import { Client } from "./Client";

import { ConfigProperties } from "../../spec/Config";
import { Context, ContextType, Coord } from "../../spec/Canvas";
import { ClientMode } from "../../spec/Client";
import { WelcomeMessage } from "../../spec/MessageSpec";

export class WebGraffiti {
  public rootElement: HTMLElement;
  public config: Config;
  public socket: Socket;
  public editor: Editor;
  public networkMonitor: NetworkMonitor;
  public render: Render;
  public loader: Loader;
  public input: Input;
  public chunkSize: number;
  public chunkMap: number[];
  public pixelMap: number[];
  public name: string;
  public color: string;
  public useNetworkMonitor: boolean;
  public useEditor: boolean;
  public clients: Client[];
  public client: Client;
  public initConfig: Partial<ConfigProperties>;
  public panOffset: Coord;
  public minOffset: Coord;
  public channelId: number;

  constructor() {
    this.rootElement = document.createElement("div");
    this.config = new Config({ wg: this });
    this.socket = new Socket({ wg: this });
    this.editor = new Editor({ wg: this });
    this.networkMonitor = new NetworkMonitor({ wg: this });
    this.render = new Render({ wg: this });
    this.loader = new Loader({ wg: this });
    this.input = new Input({ wg: this });
    this.chunkSize = 16;
    this.chunkMap = [];
    this.pixelMap = [];
    this.name = "";
    this.color = "";
    this.useNetworkMonitor = false;
    this.useEditor = true;
    this.clients = [];
    this.initConfig = {};
    this.panOffset = { x: 0, y: 0 };
    this.minOffset = { x: 0, y: 0 };
    this.client = new Client({ wg: this });
    this.channelId = 0;
  }

  init(element: HTMLElement, initConfig: Partial<ConfigProperties> = {}): void {
    const channelId = new URLSearchParams(window.location.search).get(
      "channelId"
    );
    if (channelId !== null && channelId !== undefined) {
      this.channelId = parseInt(channelId);
    }
    this.initConfig = initConfig;
    this.rootElement = element;
    this.rootElement.classList.add("webGraffiti");
    this.run();
  }

  async load(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.config
        .load(this.initConfig)
        .then(() => {
          return this.loader.init();
        })
        .then(() => {
          return this.render.load();
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.log("Encountered an error while loading!", error); // eslint-disable-line
          reject(error);
        });
    });
  }

  run() {
    if (this.useNetworkMonitor) {
      this.networkMonitor.init();
    }
    this.load().then(() => {
      this.render.init();
      this.client = new Client({ wg: this });
      this.clients.push(this.client);
      this.socket.init().catch((error) => {
        console.log(
          "Encountered an error while establishing connection!",
          error
        );
      });
    });
  }

  reload() {
    window.location.reload();
  }

  registerClient(id: string): void {
    this.clients.push(new Client({ wg: this, id }));
  }

  setClientContext(id: string, context: Context): void {
    if (context[ContextType.LINE_WIDTH]) {
      //context.lineWidth = parseInt(context.lineWidth);
    }
    this.clients.map((client) => {
      if (id === client.id) {
        client.ctx = context;
      }
      return client;
    });
  }

  setMode(mode: ClientMode): void {
    if (Object.values(ClientMode).indexOf(mode) > -1) {
      this.config.mode = mode;
    }
  }

  panX(x: number): void {
    this.panOffset.x += x;
    if (this.panOffset.x >= 0) {
      this.panOffset.x = 0;
    }
    if (this.panOffset.x < this.minOffset.x) {
      this.panOffset.x = this.minOffset.x;
    }
    this.render.canvas.style.marginLeft = String(this.panOffset.x);
  }

  panY(y: number): void {
    this.panOffset.y += y;
    if (this.panOffset.y >= 0) {
      this.panOffset.y = 0;
    }
    if (this.panOffset.y < this.minOffset.y) {
      this.panOffset.y = this.minOffset.y;
    }
    this.render.canvas.style.marginTop = String(this.panOffset.y);
  }

  handleWelcome(payload: WelcomeMessage["payload"]) {
    this.client.id = payload.id;
    this.client.setPaint(payload.paint);
    this.client.setDelta(Date.now() - payload.join);
    this.client.setMode(payload.mode);
    this.render.setActualWidth(payload.width);
    this.render.setActualHeight(payload.height);
    if (
      this.config.mode === ClientMode.INTERACT &&
      payload.mode === ClientMode.INTERACT
    ) {
      this.editor.init();
      this.input.init();
      const role = new URLSearchParams(window.location.search).get("wgRole");
      if (role) {
        this.client.setRole(parseInt(role));
      }
    }
  }
}
