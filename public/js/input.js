export default class input {
  constructor(wg) {
    this.wg = wg;
    this.latestPoint = null;
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.mouseDown = false;
  }

  init() {
    this.setupMouseEvents();
  }

  setupMouseEvents() {
    this.wg.render.canvas.addEventListener(
      'mousedown',
      (e) => {
        this.handleDown(e);
      },
      false
    );

    this.wg.render.canvas.addEventListener(
      'mousemove',
      (e) => {
        this.handleMove(e);
      },
      false
    );

    document.addEventListener(
      'mouseup',
      () => {
        this.handleUp();
      },
      false
    );
  }

  updateMouse(e) {
    this.mouse.x = e.pageX - this.wg.render.canvas.offsetLeft;
    this.mouse.y = e.pageY - this.wg.render.canvas.offsetTop;
  }

  handleDown(e) {
    this.mouseDown = true;
    this.updateMouse(e);
    this.latestPoint = {
      x: this.mouse.x,
      y: this.mouse.y,
    };
  }

  handleMove(e) {
    if (this.mouseDown) {
      this.updateMouse(e);
      this.wg.render.drawLine(
        this.latestPoint.x,
        this.latestPoint.y,
        this.mouse.x,
        this.mouse.y
      );
      this.latestPoint = {
        x: this.mouse.x,
        y: this.mouse.y,
      };
    }
  }

  handleUp() {
    if (this.mouseDown) {
      this.wg.socket.sendMessage({
        event: 'closePath',
      });
    }
    this.mouseDown = false;
  }
}
