export default class input {
  constructor(wg) {
    this.wg = wg;
    this.latestPoint = null;
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.mouseDown = false;
    this.lastClickTime = 0;
    this.lastClickNode = '';
    this.doubleClick = false;
  }

  init() {
    this.setupMouseEvents();
    this.setupTouchEvents();
  }

  setupMouseEvents() {
    document.addEventListener('mousedown', (e) => {
      if (
        Date.now() - this.lastClickTime < this.wg.config.doubleClick &&
        this.lastClickNode === e.target
      ) {
        this.doubleClick = true;
      } else {
        this.doubleClick = false;
      }
      this.lastClickTime = Date.now();
      this.lastClickNode = e.target;
    });

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

  setupTouchEvents() {
    this.wg.render.canvas.addEventListener(
      'touchstart',
      (e) => {
        this.handleDown(e);
      },
      false
    );

    this.wg.render.canvas.addEventListener(
      'touchmove',
      (e) => {
        this.handleMove(e);
      },
      false
    );

    document.addEventListener(
      'touchend',
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
      const line = [
        this.latestPoint.x,
        this.latestPoint.y,
        this.mouse.x,
        this.mouse.y,
      ];
      this.wg.render.drawLine(line);
      this.wg.socket.sendMessage({
        event: 'line',
        line,
      });
      this.latestPoint = {
        x: this.mouse.x,
        y: this.mouse.y,
      };
    }
  }

  handleUp() {
    this.mouseDown = false;
  }
}
