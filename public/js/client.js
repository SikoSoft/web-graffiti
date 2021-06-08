export default class client {
  constructor(wg, id) {
    this.wg = wg;
    this.id = id;
    this.connected = true;
    this.color = '';
    this.alpha = 1;
    this.ctx = {
      lineWidth: 1,
      lineCap: 'round',
      lineJoin: 'round',
    };
  }

  syncContext() {
    this.wg.socket.sendMessage({
      event: 'setContext',
      ctx: this.ctx,
    });
  }

  setAlpha(alpha) {
    this.alpha = alpha;
    this.setColor(this.color);
  }

  setColor(color) {
    this.color = color;
    this.ctx.strokeStyle = color.replace(
      /ff$/,
      Math.round(this.alpha * 255).toString(16) // eslint-disable-line
    );
    this.syncContext();
  }

  setLineWidth(width) {
    this.ctx.lineWidth = width;
    this.syncContext();
  }
}
