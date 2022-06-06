import config from "./config.js";
import editor from "./editor.js";
import socket from "./socket.js";
import networkMonitor from "./networkMonitor.js";
import render from "./render.js";
import loader from "./loader.js";
import input from "./input.js";
import client from "./client.js";
import magicNum from "./magicNum.js";

export default class webGraffiti {
  constructor() {
    this.rootElement = "";
    this.config = new config(this);
    this.socket = new socket(this);
    this.editor = new editor(this);
    this.networkMonitor = new networkMonitor(this);
    this.render = new render(this);
    this.loader = new loader(this);
    this.input = new input(this);
    this.chunkSize = 16;
    this.chunkMap = [];
    this.pixelMap = [];
    this.name = "";
    this.color = "";
    this.useNetworkMonitor = false;
    this.useEditor = true;
    this.clients = [];
    this.initiConfig = {};
  }

  init(element, initConfig = {}) {
    this.initConfig = initConfig;
    this.rootElement = element;
    this.rootElement.classList.add("webGraffiti");
    this.run();
  }

  async load() {
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
      this.client = new client(this);
      this.clients.push(this.client);
      this.socket
        .init()
        .then(() => {
          if (this.config.mode === magicNum.MODE_INTERACTIVE) {
            this.editor.init();
            this.input.init();
          }
        })
        .catch((error) => {
          console.log(
            "Encountered an error while establishing connection!",
            error
          );
        });
    });
  }

  getChunk(x, y) {
    return `${Math.floor((x - 1) / this.chunkSize)}x${Math.floor(
      (y - 1) / this.chunkSize
    )}`;
  }

  getChunkHash(cx, cy) {
    let chars = "";
    for (let x = cx; x < cx + this.chunkSize; x++) {
      for (let y = cy; y < cy + this.chunkSize; y++) {
        chars += this.getPixel(x, y);
      }
    }
    return window.SparkMD5.hash(chars);
  }

  registerClient(id) {
    this.clients.push(new client(this, id));
  }

  setClientContext(id, context) {
    if (context.lineWidth) {
      context.lineWidth = parseInt(context.lineWidth);
    }
    this.clients.map((client) => {
      if (id === client.id) {
        client.ctx = context;
      }
      return client;
    });
  }

  setMode(mode) {
    if (
      [magicNum.MODE_INTERACTIVE, magicNum.MODE_SPECTATOR].indexOf(mode) > -1
    ) {
      this.config.mode = mode;
    }
  }
}
