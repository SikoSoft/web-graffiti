import { Line } from "../../spec/Canvas";
import { MessageEvent } from "../../spec/MessageSpec";
import { WebGraffiti } from "./WebGraffiti";

declare type MouseHandler = (e: MouseEvent) => void;
declare type TouchHandler = (e: TouchEvent) => void;

export interface Point {
  pageX: number;
  pageY: number;
  x: number;
  y: number;
}

export interface InputOptions {
  wg: WebGraffiti;
}

export class Input {
  private wg: WebGraffiti;
  private latestPoint: Point;
  private mouse: Point;

  private mouseDown: boolean;

  public doubleClick: boolean;
  private multiGesture: boolean;
  private enabled: boolean;

  private doubleClickListener: MouseHandler;
  private mouseDownListener: MouseHandler;
  private mouseUpListener: MouseHandler;
  private mouseMoveListener: MouseHandler;
  private touchStartListener: TouchHandler;
  private touchEndListener: TouchHandler;
  private touchMoveListener: TouchHandler;
  private ctcListener: MouseHandler;
  private ttcListener: TouchHandler;

  constructor({ wg }: InputOptions) {
    this.wg = wg;
    this.latestPoint = {
      pageX: 0,
      pageY: 0,
      x: 0,
      y: 0,
    };
    this.mouse = {
      pageX: 0,
      pageY: 0,
      x: 0,
      y: 0,
    };
    this.mouseDown = false;
    this.doubleClick = false;
    this.multiGesture = false;
    this.enabled = false;

    this.doubleClickListener = (e) => {};
    this.mouseDownListener = (e) => {};
    this.mouseUpListener = (e) => {};
    this.mouseMoveListener = (e) => {};
    this.touchStartListener = (e) => {};
    this.touchEndListener = (e) => {};
    this.touchMoveListener = (e) => {};
    this.ctcListener = (e) => {};
    this.ttcListener = (e) => {};
  }

  init(): void {
    this.enable();
  }

  enable(): void {
    if (!this.enabled) {
      this.setupMouseEvents();
      this.setupTouchEvents();
      this.disableConnectEvents();
      this.enabled = true;
    }
  }

  disable(): void {
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

  enableClickToConnect(): void {
    this.ctcListener = (e) => {
      this.wg.socket.connect();
    };
    document.addEventListener("mousedown", this.ctcListener);
  }

  disableClickToConnect(): void {
    document.removeEventListener("mousedown", this.ctcListener);
  }

  enableTouchToConnect(): void {
    this.ttcListener = (e) => {
      this.wg.render.canvas.dispatchEvent(new MouseEvent("mousedown"));
    };
    document.addEventListener("touchstart", this.ttcListener);
  }

  disableTouchToConnect(): void {
    document.removeEventListener("touchstart", this.ttcListener);
  }

  setupMouseEvents(): void {
    this.doubleClickListener = (e) => {
      this.doubleClick = true;
      setTimeout(() => {
        this.doubleClick = false;
      }, this.wg.config.doubleClick);
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

  setupTouchEvents(): void {
    this.touchStartListener = (e) => {
      if (e.targetTouches.length > 1) {
        this.multiGesture = true;
      } else {
        this.multiGesture = false;
      }
      this.wg.editor.handle.innerHTML = String(e.targetTouches.length);
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

  enableConnectEvents(): void {
    this.enableClickToConnect();
    this.enableTouchToConnect();
  }

  disableConnectEvents(): void {
    this.disableClickToConnect();
    this.disableTouchToConnect();
  }

  updateMouse(e: MouseEvent): void {
    this.mouse.pageX = e.pageX;
    this.mouse.pageY = e.pageY;
    this.mouse.x = e.pageX - this.wg.render.canvas.offsetLeft;
    this.mouse.y = e.pageY - this.wg.render.canvas.offsetTop;
  }

  handleDown(e: MouseEvent): void {
    this.mouseDown = true;
    this.updateMouse(e);
    this.latestPoint = {
      pageX: this.mouse.pageX,
      pageY: this.mouse.pageY,
      x: this.mouse.x,
      y: this.mouse.y,
    };
  }

  handleMove(e: MouseEvent): void {
    if (this.mouseDown) {
      this.updateMouse(e);
      if (this.multiGesture) {
        this.wg.panX(this.mouse.pageX - this.latestPoint.pageX);
        this.wg.panY(this.mouse.pageY - this.latestPoint.pageY);
      } else {
        const line: Line = [
          this.latestPoint.x,
          this.latestPoint.y,
          this.mouse.x,
          this.mouse.y,
        ];
        const paintNeeded =
          parseInt(String(this.wg.client.ctx.lineWidth)) * Math.PI;
        if (this.wg.client.paint - paintNeeded > 0) {
          this.wg.render.drawLine(line, this.wg.client.ctx);
          this.wg.socket.sendMessage({
            event: MessageEvent.LINE,
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

  handleUp(): void {
    this.mouseDown = false;
  }

  registerClick(element: HTMLElement, action: MouseHandler): void {
    element.addEventListener("mousedown", action);
    element.addEventListener("touchstart", () => {
      element.dispatchEvent(new MouseEvent("mousedown"));
    });
  }
}
