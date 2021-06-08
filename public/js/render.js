export default class render {
  constructor(wg) {
    this.wg = wg;
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
}
