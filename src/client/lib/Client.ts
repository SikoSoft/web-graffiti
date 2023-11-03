import { Context, initialContext } from "../../spec/Canvas";
import { ClientMode } from "../../spec/Client";
import { MessageEvent } from "../../spec/MessageSpec";
import { WebGraffiti } from "./WebGraffiti";

export interface ClientOptions {
  wg: WebGraffiti;
  id?: string;
}

export class Client {
  private wg: WebGraffiti;
  public id: string;
  private delta: number;
  public connected: boolean;
  public paint: number;
  public color: string;
  private alpha: number;
  public ctx: Context;
  public mode: ClientMode;

  constructor({ wg, id }: ClientOptions) {
    this.wg = wg;
    this.id = id || "";
    this.delta = 0;
    this.connected = true;
    this.paint = 10000;
    this.color = "";
    this.alpha = 1;
    this.ctx = Object.assign({}, initialContext);
    this.mode = ClientMode.INTERACT;
  }

  init() {
    this.alpha = this.wg.config.defAlpha;
  }

  syncContext(): void {
    this.wg.socket.sendMessage({
      event: MessageEvent.SET_CONTEXT,
      payload: { ctx: this.ctx },
    });
  }

  setAlpha(alpha: number): void {
    this.alpha = alpha;
    this.setColor(this.color);
  }

  setColor(color: string): void {
    this.color = color;
    this.ctx.strokeStyle = `${color}${Math.round(this.alpha * 255).toString(
      16
    )}`;
    this.syncContext();
    this.wg.render.syncCursor();
  }

  setLineWidth(width: number): void {
    this.ctx.lineWidth =
      width > this.wg.config.maxBrushSize
        ? this.wg.config.maxBrushSize
        : width < this.wg.config.minBrushSize
        ? this.wg.config.minBrushSize
        : width;
    this.syncContext();
    this.wg.render.syncCursor();
  }

  adjustPaint(amount: number): void {
    this.paint += amount;
  }

  setPaint(paint: number): void {
    this.paint = paint;
    this.wg.editor.initialized && this.wg.editor.updatePaintMeter();
  }

  setDelta(delta: number): void {
    this.delta = delta;
  }

  setMode(mode: ClientMode) {
    this.mode = mode;
  }

  refill(): void {
    this.wg.socket.sendMessage({ event: MessageEvent.REFILL, payload: {} });
  }

  setRole(role: number): void {
    this.wg.socket.sendMessage({
      event: MessageEvent.SET_ROLE,
      payload: { role },
    });
  }
}
