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

    this.wg.render.canvas.addEventListener(
      "mousedown",
      (e) => {
        //this.multiGesture = false;
        this.handleDown(e);
      },
      false
    );

    this.wg.render.canvas.addEventListener(
      "mousemove",
      (e) => {
        this.handleMove(e);
      },
      false
    );

    document.addEventListener(
      "mouseup",
      () => {
        this.handleUp();
      },
      false
    );
  }

  setupTouchEvents() {
    this.wg.render.canvas.addEventListener(
      "touchstart",
      (e) => {
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
      },
      false
    );

    this.wg.render.canvas.addEventListener(
      "touchmove",
      (e) => {
        let touch = e.touches[0];
        let mouseEvent = new MouseEvent("mousemove", {
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
        this.wg.render.canvas.dispatchEvent(mouseEvent);
        e.preventDefault();
      },
      false
    );

    document.addEventListener(
      "touchend",
      (e) => {
        let mouseEvent = new MouseEvent("mouseup", {});
        this.wg.render.canvas.dispatchEvent(mouseEvent);
        if (e.cancelable) {
          e.preventDefault();
        }
      },
      false
    );
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
