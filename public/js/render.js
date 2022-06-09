import loader from "./loader.js";
import magicNum from "./magicNum.js";

export default class render {
  constructor(wg) {
    this.wg = wg;
    this.resizeDebounce = 0;
    this.ready = false;
    this.width = 0;
    this.height = 0;
    this.actualWidth = 0;
    this.actualHeight = 0;
    this.xRatio = 1;
    this.yRatio = 1;
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

  setActualWidth(width) {
    this.actualWidth = width;
    this.wg.minOffset.x = 0 - (width - window.innerWidth);
    this.syncXRatio();
  }

  setActualHeight(height) {
    this.actualHeight = height;
    this.wg.minOffset.y = 0 - (height - window.innerHeight);
    this.syncYRatio();
  }

  setWidth(width) {
    this.width = width;
    this.canvas.setAttribute("width", width);
    this.syncXRatio();
    this.queueRedraw();
  }

  setHeight(height) {
    this.height = height;
    this.canvas.setAttribute("height", height);
    this.syncYRatio();
    this.queueRedraw();
  }

  syncXRatio() {
    this.xRatio =
      this.width && this.actualWidth ? this.width / this.actualWidth : 1;
  }

  syncYRatio() {
    this.yRatio =
      this.height && this.actualHeight ? this.height / this.actualHeight : 1;
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
    this.wg.loader.show();
    return new Promise((resolve) => {
      this.loadImage().then(() => {
        this.wg.loader.hide();
        resolve();
      });
    });
  }

  loadImage() {
    return new Promise((resolve, reject) => {
      this.image = new Image();
      this.image.src = `${this.wg.config.webServer}/${this.wg.config.imageName}`;
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

  drawLine([x1, y1, x2, y2], ctx) {
    const newCtx = { ...ctx };
    newCtx.lineWidth = newCtx.lineWidth * Math.max(this.xRatio, this.yRatio);
    this.setContext(newCtx);
    this.ctx.beginPath();
    this.ctx.moveTo(x1 * this.xRatio, y1 * this.yRatio);
    this.ctx.lineTo(x2 * this.xRatio, y2 * this.yRatio);
    this.ctx.stroke();
    this.ctx.closePath();
    this.setContext(this.wg.client.ctx);
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
