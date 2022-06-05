import magicNum from "./magicNum.js";

export default class render {
  constructor(wg) {
    this.wg = wg;
    this.resizeDebounce = 0;
    this.ready = false;
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.canvas.className = "webGraffiti__canvas";
    this.wg.rootElement.append(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.setWidth(this.wg.config.width);
    this.setHeight(this.wg.config.height);
    this.ready = true;
  }

  setWidth(width) {
    this.canvas.setAttribute("width", width);
    this.queueRedraw();
  }

  setHeight(height) {
    this.canvas.setAttribute("height", height);
    this.queueRedraw();
  }

  queueRedraw() {
    if (this.resizeDebounce) {
      clearTimeout(this.resizeDebounce);
    }
    this.resizeDebounce = setTimeout(() => {
      this.drawImage();
    }, 50);
  }

  drawImage() {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.wg.config.width,
      this.wg.config.height
    );
  }

  load() {
    return new Promise((resolve) => {
      this.loadImage().then(() => {
        resolve();
      });
    });
  }

  loadImage() {
    return new Promise((resolve, reject) => {
      this.image = new Image();
      this.image.src = this.wg.config.imageName;
      this.image.onload = () => {
        resolve();
      };
      this.image.onerror = () => {
        reject();
      };
    });
  }

  setContext(ctx) {
    for (const key in ctx) {
      this.ctx[key] = ctx[key];
    }
  }

  drawLine([x1, y1, x2, y2], context) {
    this.setContext(context);
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();
    this.setContext(this.wg.client);
  }

  getCursor() {
    const color = this.wg.client.color;
    const brushSize = this.wg.client.ctx.lineWidth;
    const halfSize = brushSize * magicNum.HALF;
    const rawCursor = `<svg viewBox="0 0 ${brushSize} ${brushSize}" xmlns="http://www.w3.org/2000/svg" width="${brushSize}px" height="${brushSize}px">
      <circle cx="${halfSize}" cy="${halfSize}" r="${halfSize}" fill="${color}" stroke="${color}"/>
    </svg>`;
    return btoa(rawCursor);
  }

  syncCursor() {
    const halfSize = this.wg.client.ctx.lineWidth * magicNum.HALF;
    this.canvas.style.cursor = `url('data:image/svg+xml;base64,${this.getCursor()}') ${halfSize} ${halfSize}, crosshair`;
  }
}
