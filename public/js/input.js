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
    this.enabled = false;
  }

  init() {
    this.enable();
  }

  enable() {
    if (!this.enabled) {
      this.setupMouseEvents();
      this.setupTouchEvents();
      this.disableConnectEvents();
      this.enabled = true;
    }
  }

  disable() {
    document.removeEventListener("mousedown", this.doubleClickListener);
    this.wg.render.canvas.removeEventListener(
      "mousedown",
      this.mouseUpListener
    );
    this.wg.render.canvas.removeEventListener(
      "mousemove",
      this.mouseMoveListener
    );
    document.removeEventListener("mouseup", this.mouseUpListener);
    this.wg.render.canvas.removeEventListener(
      "touchstart",
      this.touchStartListener
    );
    this.wg.render.canvas.removeEventListener(
      "touchmove",
      this.touchMoveListener
    );
    document.removeEventListener("touchend", this.touchEndListener);
    this.enableConnectEvents();
    this.enabled = false;
  }

  enableClickToConnect() {
    this.ctcListener = (e) => {
      this.wg.socket.connect();
    };
    document.addEventListener("mousedown", this.ctcListener);
  }

  disableClickToConnect() {
    document.removeEventListener("mousedown", this.ctcListener);
  }

  enableTouchToConnect() {
    this.ttcListener = (e) => {
      this.wg.render.canvas.dispatchEvent(new MouseEvent("mousedown"));
    };
    document.addEventListener("touchstart", this.ttcListener);
  }

  disableTouchToConnect() {
    document.removeEventListener("touchstart", this.ttcListener);
  }

  setupMouseEvents() {
    this.doubleClickListener = (e) => {
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
    };
    document.addEventListener("mousedown", this.doubleClickListener);

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

  enableConnectEvents() {
    this.enableClickToConnect();
    this.enableTouchToConnect();
  }

  disableConnectEvents() {
    this.disableClickToConnect();
    this.disableTouchToConnect();
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
            payload: { line },
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

  registerClick(element, action) {
    element.addEventListener("mousedown", action);
    element.addEventListener("touchstart", () => {
      element.dispatchEvent(new MouseEvent("mousedown"));
    });
  }
}
