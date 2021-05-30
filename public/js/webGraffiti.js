import config from './config.js';
import magicNum from './magicNum.js';

export default class webGraffiti {
  constructor() {
    this.config = new config(this);
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.mouseDown = false;
    this.chunkSize = 16;
    this.chunkMap = [];
    this.pixelMap = [];
    this.name = '';
    this.color = '';
    this.client = {
      id: '',
      connected: false,
      ctx: {
        strokeStyle: '#88f45366',
        lineWidth: 1,
        lineCap: 'round',
        lineJoin: 'round',
      },
    };
  }

  init(canvasId) {
    this.canvasId = canvasId;
    this.canvas = document.getElementById(this.canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener(
      'mousedown',
      (e) => {
        this.mouseDown = true;
        this.updateMouse(e);
        this.ctx.beginPath();
        this.sendMessage({
          event: 'beginPath',
        });
        this.ctx.moveTo(this.mouse.x, this.mouse.y);
        this.paint();
      },
      false
    );
    this.canvas.addEventListener('mousemove', (e) => {
      if (this.mouseDown) {
        this.updateMouse(e);
        this.paint();
      }
    });
    document.addEventListener(
      'mouseup',
      () => {
        this.mouseDown = false;
        this.ctx.closePath();
        this.sendMessage({
          event: 'closePath',
        });
      },
      false
    );
    this.run();
  }

  loadImage() {
    return new Promise((resolve) => {
      this.image = new Image();
      this.image.src = this.config.imageName;
      this.image.onload = () => {
        resolve();
      };
    });
  }

  openConnection() {
    return new Promise((resolve) => {
      this.ws = new WebSocket(this.config.mpServer);
      this.ws.onopen = () => {
        this.client.connected = true;
        resolve();
      };
      this.ws.onmessage = (message) => {
        this.handleMessage(message);
      };
      this.ws.onclose = () => {
        this.client.connected = false;
      };
    });
  }

  load() {
    return new Promise((resolve) => {
      this.config
        .load()
        .then(() => {
          return this.openConnection();
        })
        .then(() => {
          return this.loadImage();
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
    this.load().then(() => {
      this.ctx.drawImage(this.image, 0, 0);
      this.setContext();
    });
  }

  updateMouse(e) {
    this.mouse.x = e.pageX - this.canvas.offsetLeft;
    this.mouse.y = e.pageY - this.canvas.offsetTop;
  }

  paint() {
    this.ctx.lineTo(this.mouse.x, this.mouse.y);
    this.ctx.stroke();
    this.sendMessage({
      event: 'paint',
      x: this.mouse.x,
      y: this.mouse.y,
    });
  }

  setColor(color) {
    this.client.ctx.strokeStyle = color.replace(/ff$/, '55');
    this.setContext();
  }

  setContext() {
    for (const key in this.client.ctx) {
      this.ctx[key] = this.client.ctx[key];
    }
    this.sendMessage({
      event: 'setContext',
      ctx: this.client.ctx,
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

  getPixel(x, y) {
    return this.ctx.getImageData(x, y, 1, 1).data.join('');
  }

  drawPixel(x, y, r, g, b, a) {
    /*
      const pixelData = this.ctx.createImageData(1, 1);
      pixelData.data[0] = r;
      pixelData.data[1] = g;
      pixelData.data[2] = b;
      pixelData.data[3] = a;
      this.ctx.putImageData(pixelData, x, y);
      */
    this.ctx.fillStyle =
      'rgba(' + r + ',' + g + ',' + b + ',' + a / magicNum.ALPHA_MAX + ')';
    this.ctx.fillRect(x, y, 1, 1);
  }

  sendMessage(message) {
    this.ws.send(JSON.stringify(message));
  }

  handleMessage(message) {
    const json = JSON.parse(message.data);
    switch (json.event) {
      case 'pixel':
        this.drawPixel(json.x, json.y, json.r, json.g, json.b, json.a);
        break;
    }
  }
}
