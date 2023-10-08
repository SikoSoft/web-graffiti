//import { Canvas } from "canvas";
import { Context, ContextHandler, ContextType, Line } from "../spec/Canvas";
import { Loader } from "./Loader";
import { WebGraffiti } from "./WebGraffiti";

export interface RenderOptions {
  wg: WebGraffiti;
}

export class Render {
  private wg: WebGraffiti;
  private resizeDebounce: ReturnType<typeof setTimeout> | null;
  private ready: boolean;
  public width: number;
  public height: number;
  public actualWidth: number;
  public actualHeight: number;
  public xRatio: number;
  public yRatio: number;

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public image: HTMLImageElement;

  private ctxMap: Record<string, ContextHandler>;

  constructor({ wg }: RenderOptions) {
    this.wg = wg;
    this.resizeDebounce = null;
    this.ready = false;
    this.ready = false;
    this.width = 0;
    this.height = 0;
    this.actualWidth = 0;
    this.actualHeight = 0;
    this.xRatio = 1;
    this.yRatio = 1;

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.image = new Image();

    this.ctxMap = {
      [ContextType.LINE_CAP]: (v) => {
        this.ctx.lineCap = v as CanvasLineCap;
      },
      [ContextType.LINE_JOIN]: (v) => {
        this.ctx.lineJoin = v as CanvasLineJoin;
      },
      [ContextType.LINE_WIDTH]: (v) => {
        this.ctx.lineWidth = v as number;
      },
      [ContextType.STROKE_STYLE]: (v) => {
        this.ctx.strokeStyle = v as string;
      },
    };
  }

  init() {
    this.canvas.className = "webGraffiti__canvas";
    this.wg.rootElement.append(this.canvas);

    this.setWidth(this.wg.config.width);
    this.setHeight(this.wg.config.height);
    this.ready = true;
  }

  setActualWidth(width: number) {
    this.actualWidth = width;
    this.wg.minOffset.x = 0 - (width - window.innerWidth);
    this.syncXRatio();
  }

  setActualHeight(height: number): void {
    this.actualHeight = height;
    this.wg.minOffset.y = 0 - (height - window.innerHeight);
    this.syncYRatio();
  }

  setWidth(width: number): void {
    this.width = width;
    this.canvas.setAttribute("width", String(width));
    this.syncXRatio();
    this.queueRedraw();
  }

  setHeight(height: number): void {
    this.height = height;
    this.canvas.setAttribute("height", String(height));
    this.syncYRatio();
    this.queueRedraw();
  }

  syncXRatio(): void {
    this.xRatio =
      this.width && this.actualWidth ? this.width / this.actualWidth : 1;
  }

  syncYRatio(): void {
    this.yRatio =
      this.height && this.actualHeight ? this.height / this.actualHeight : 1;
  }

  queueRedraw(): void {
    if (this.resizeDebounce) {
      clearTimeout(this.resizeDebounce);
    }
    this.resizeDebounce = setTimeout(() => {
      this.drawImage();
    }, 50);
  }

  drawImage(): void {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.wg.config.width,
      this.wg.config.height
    );
  }

  load(): Promise<void> {
    this.wg.loader.show();
    return new Promise((resolve) => {
      this.loadImage().then(() => {
        this.wg.loader.hide();
        resolve();
      });
    });
  }

  loadImage(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.image.src = `${this.wg.config.webServer}/${this.wg.config.imageName}`;
      this.image.onload = () => {
        resolve();
      };
      this.image.onerror = () => {
        reject();
      };
    });
  }

  setContext(ctx: Record<string, string | number>): void {
    for (const key in ctx) {
      if (key in this.ctxMap) {
        this.ctxMap[key](ctx[key]);
      }
    }
  }

  drawLine([x1, y1, x2, y2]: Line, ctx: Context) {
    const newCtx = { ...ctx };
    newCtx.lineWidth =
      parseInt(String(newCtx.lineWidth)) * Math.max(this.xRatio, this.yRatio);
    this.setContext(newCtx);
    this.ctx.beginPath();
    this.ctx.moveTo(x1 * this.xRatio, y1 * this.yRatio);
    this.ctx.lineTo(x2 * this.xRatio, y2 * this.yRatio);
    this.ctx.stroke();
    this.ctx.closePath();
    this.setContext(this.wg.client.ctx);
  }

  getCursor() {
    const color = this.wg.client.color;
    const brushSize = this.wg.client.ctx.lineWidth;
    const halfSize = parseInt(String(brushSize)) * 0.5;
    const rawCursor = `<svg viewBox="0 0 ${brushSize} ${brushSize}" xmlns="http://www.w3.org/2000/svg" width="${brushSize}px" height="${brushSize}px">
      <circle cx="${halfSize}" cy="${halfSize}" r="${halfSize}" fill="${color}" stroke="${color}"/>
    </svg>`;
    return btoa(rawCursor);
  }

  syncCursor() {
    const halfSize = parseInt(String(this.wg.client.ctx.lineWidth)) * 0.5;
    this.canvas.style.cursor = `url('data:image/svg+xml;base64,${this.getCursor()}') ${halfSize} ${halfSize}, crosshair`;
  }
}
