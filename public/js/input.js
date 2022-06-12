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
    this.lastClickNode = "";
    this.doubleClick = false;
    this.multiGesture = false;
  }

  init() {
    this.setupMouseEvents();
    this.setupTouchEvents();
  }

  disable() {
    this.wg.render.canvas.removeEventListener(
      "mousedown",
      this.mouseUpListener
    );
    this.wg.render.canvas.removeEventListener(
      "mousemove",
      this.mouseMoveListener
    );
    this.wg.render.canvas.removeEventListener("mouseup", this.mouseUpListener);
    this.wg.render.canvas.removeEventListener(
      "touchstart",
      this.touchStartListener
    );
    this.wg.render.canvas.removeEventListener(
      "touchmove",
      this.touchMoveListener
    );
    this.wg.render.canvas.removeEventListener(
      "touchend",
      this.touchEndListener
    );
  }

  setupMouseEvents() {
    document.addEventListener("mousedown", (e) => {
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

    this.mouseDownListener = (e) => {
      this.handleDown(e);
    };
    this.wg.render.canvas.addEventListener(
      "mousedown",
      this.mouseDownListener,
      false
    );

    this.mouseMoveListener = (e) => {
      this.handleMove(e);
    };
    this.wg.render.canvas.addEventListener(
      "mousemove",
      this.mouseMoveListener,
      false
    );

    this.mouseUpListener = () => {
      this.handleUp();
    };
    document.addEventListener("mouseup", this.mouseUpListener, false);
  }

  setupTouchEvents() {
    this.touchStartListener = (e) => {
      if (e.targetTouches.length > 1) {
        this.multiGesture = true;
      } else {
        this.multiGesture = false;
      }
      this.wg.editor.handle.innerHTML = e.targetTouches.length;
      let touch = e.touches[0];
      let mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      this.wg.render.canvas.dispatchEvent(mouseEvent);
      e.preventDefault();
    };
    this.wg.render.canvas.addEventListener(
      "touchstart",
      this.touchStartListener,
      false
    );

    this.touchMoveListener = (e) => {
      let touch = e.touches[0];
      let mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      this.wg.render.canvas.dispatchEvent(mouseEvent);
      e.preventDefault();
    };
    this.wg.render.canvas.addEventListener(
      "touchmove",
      this.touchMoveListener,
      false
    );

    this.touchEndListener = (e) => {
      let mouseEvent = new MouseEvent("mouseup", {});
      this.wg.render.canvas.dispatchEvent(mouseEvent);
      if (e.cancelable) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchend", this.touchEndListener, false);
  }

  updateMouse(e) {
    this.mouse.pageX = e.pageX;
    this.mouse.pageY = e.pageY;
    this.mouse.x = e.pageX - this.wg.render.canvas.offsetLeft;
    this.mouse.y = e.pageY - this.wg.render.canvas.offsetTop;
  }

  handleDown(e) {
    this.mouseDown = true;
    this.updateMouse(e);
    this.latestPoint = {
      pageX: this.mouse.pageX,
      pageY: this.mouse.pageY,
      x: this.mouse.x,
      y: this.mouse.y,
    };
  }

  handleMove(e) {
    if (this.mouseDown) {
      this.updateMouse(e);
      if (this.multiGesture) {
        this.wg.panX(this.mouse.pageX - this.latestPoint.pageX);
        this.wg.panY(this.mouse.pageY - this.latestPoint.pageY);
      } else {
        const line = [
          this.latestPoint.x,
          this.latestPoint.y,
          this.mouse.x,
          this.mouse.y,
        ];
        const paintNeeded = this.wg.client.ctx.lineWidth * Math.PI;
        if (this.wg.client.paint - paintNeeded > 0) {
          this.wg.render.drawLine(line, this.wg.client.ctx);
          this.wg.socket.sendMessage({
            event: "line",
            line,
          });
        }
      }
      this.latestPoint = {
        pageX: this.mouse.pageX,
        pageY: this.mouse.pageY,
        x: this.mouse.x,
        y: this.mouse.y,
      };
    }
  }

  handleUp() {
    this.mouseDown = false;
  }
}
