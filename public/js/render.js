export default class render {
  constructor(wg) {
    this.wg = wg;
    this.color = '';
    this.alpha = 1;
  }

  init() {
    this.alpha = this.wg.config.defaultAlpha;
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

  setColor(color) {
    this.color = color;
    this.wg.client.ctx.strokeStyle = color.replace(
      /ff$/,
      Math.round(this.alpha * 255).toString(16) // eslint-disable-line
    );
    this.setContext();
  }

  setLineWidth(width) {
    this.wg.client.ctx.lineWidth = width;
    this.setContext();
  }

  setAlpha(alpha) {
    this.alpha = alpha;
    this.setColor(this.color);
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

  drawLine([x1, y1, x2, y2]) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
