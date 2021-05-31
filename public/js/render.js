import magicNum from './magicNum.js';

export default class render {
  constructor(wg) {
    this.wg = wg;
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'webGraffiti__canvas';
    this.wg.rootElement.append(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.setAttribute('width', this.wg.config.width);
    this.canvas.setAttribute('height', this.wg.config.height);
    this.ctx.drawImage(this.image, 0, 0);
  }

  load() {
    return new Promise((resolve) => {
      this.loadImage().then(() => {
        resolve();
      });
    });
  }

  loadImage() {
    return new Promise((resolve) => {
      this.image = new Image();
      this.image.src = this.wg.config.imageName;
      this.image.onload = () => {
        resolve();
      };
    });
  }

  setColor(color) {
    this.wg.client.ctx.strokeStyle = color.replace(/ff$/, 'dd');
    this.setContext();
  }

  setContext() {
    for (const key in this.wg.client.ctx) {
      this.ctx[key] = this.wg.client.ctx[key];
    }
    this.wg.socket.sendMessage({
      event: 'setContext',
      ctx: this.wg.client.ctx,
    });
  }

  paint() {
    this.ctx.lineTo(this.wg.mouse.x, this.wg.mouse.y);
    this.ctx.stroke();
    this.wg.socket.sendMessage({
      event: 'paint',
      x: this.wg.mouse.x,
      y: this.wg.mouse.y,
    });
  }

  getPixel(x, y) {
    return this.ctx.getImageData(x, y, 1, 1).data.join('');
  }

  drawPixel(x, y, r, g, b, a) {
    this.ctx.fillStyle =
      'rgba(' + r + ',' + g + ',' + b + ',' + a / magicNum.ALPHA_MAX + ')';
    this.ctx.fillRect(x, y, 1, 1);
  }
}
