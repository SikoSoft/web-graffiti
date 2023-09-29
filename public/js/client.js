export default class client {
  constructor(wg, id) {
    this.wg = wg;
    this.id = id;
    this.delta = 0;
    this.connected = true;
    this.paint = 10000;
    this.color = "";
    this.alpha = this.wg.config.defAlpha;
    this.ctx = {
      lineWidth: this.wg.config.defBrushSize,
      lineCap: "round",
      lineJoin: "round",
    };
  }

  syncContext() {
    this.wg.socket.sendMessage({
      event: "setContext",
      payload: { ctx: this.ctx },
    });
  }

  setAlpha(alpha) {
    this.alpha = alpha;
    this.setColor(this.color);
  }

  setColor(color) {
    this.color = color;
    this.ctx.strokeStyle = `${color}${Math.round(this.alpha * 255).toString(
      16
    )}`; // eslint-disable-line
    this.syncContext();
    this.wg.render.syncCursor();
  }

  setLineWidth(width) {
    this.ctx.lineWidth =
      width > this.wg.config.maxBrushSize
        ? this.wg.config.maxBrushSize
        : width < this.wg.config.minBrushSize
        ? this.wg.config.minBrushSize
        : width;
    this.syncContext();
    this.wg.render.syncCursor();
  }

  adjustPaint(amount) {
    this.paint += amount;
  }

  setPaint(paint) {
    this.paint = paint;
    this.wg.editor.initialized && this.wg.editor.updatePaintMeter();
  }

  setDelta(delta) {
    this.delta = delta;
  }

  refill() {
    this.wg.socket.sendMessage({ event: "refill" });
  }

  setRole(role) {
    this.wg.socket.sendMessage({ event: "role", payload: { newRole: role } });
  }
}
