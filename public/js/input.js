export default class input {
  constructor(wg) {
    this.wg = wg;
  }

  init() {
    this.setupMouseEvents();
  }

  setupMouseEvents() {
    this.wg.render.canvas.addEventListener(
      'mousedown',
      (e) => {
        this.wg.mouseDown = true;
        this.wg.updateMouse(e);
        this.wg.render.ctx.beginPath();
        this.wg.socket.sendMessage({
          event: 'beginPath',
        });
        this.wg.render.ctx.moveTo(this.wg.mouse.x, this.wg.mouse.y);
        this.wg.render.paint();
      },
      false
    );
    this.wg.render.canvas.addEventListener(
      'mousemove',
      (e) => {
        if (this.wg.mouseDown) {
          this.wg.updateMouse(e);
          this.wg.render.paint();
        }
      },
      false
    );
    document.addEventListener(
      'mouseup',
      () => {
        if (this.wg.mouseDown) {
          this.wg.render.ctx.closePath();
          this.wg.socket.sendMessage({
            event: 'closePath',
          });
        }
        this.wg.mouseDown = false;
      },
      false
    );
  }
}
