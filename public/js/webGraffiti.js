import config from './config.js';
import editor from './editor.js';
import socket from './socket.js';
import networkMonitor from './networkMonitor.js';
import render from './render.js';
import input from './input.js';

export default class webGraffiti {
  constructor() {
    this.rootElement = '';
    this.config = new config(this);
    this.socket = new socket(this);
    this.editor = new editor(this);
    this.networkMonitor = new networkMonitor(this);
    this.render = new render(this);
    this.input = new input(this);
    this.chunkSize = 16;
    this.chunkMap = [];
    this.pixelMap = [];
    this.name = '';
    this.color = '';
    this.useNetworkMonitor = true;
    this.useEditor = true;
    this.client = {
      id: '',
      connected: false,
      ctx: {
        lineWidth: 1,
        lineCap: 'round',
        lineJoin: 'round',
      },
    };
  }

  init(element) {
    this.rootElement = element;
    this.run();
  }

  load() {
    return new Promise((resolve) => {
      this.config
        .load()
        .then(() => {
          return this.render.load();
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.log('Encountered an error while loading!', error); // eslint-disable-line
        });
    });
  }

  run() {
    this.networkMonitor.init();
    this.load().then(() => {
      this.render.init();
      this.socket
        .init()
        .then(() => {
          this.editor.init();
          this.input.init();
        })
        .catch((error) => {
          console.log(
            'Encountered an error while establishing connection!',
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
    let chars = '';
    for (let x = cx; x < cx + this.chunkSize; x++) {
      for (let y = cy; y < cy + this.chunkSize; y++) {
        chars += this.getPixel(x, y);
      }
    }
    return window.SparkMD5.hash(chars);
  }
}
