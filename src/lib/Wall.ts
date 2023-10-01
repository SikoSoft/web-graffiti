import {
  Canvas,
  CanvasLineCap,
  CanvasLineJoin,
  CanvasRenderingContext2D,
  createCanvas,
  loadImage,
} from "canvas";
import { Config } from "./Config";
import fs from "fs";
import { createHash } from "crypto";
import pino from "pino";

export enum ContextType {
  STROKE_STYLE = "strokeStyle",
  LINE_WIDTH = "lineWidth",
  LINE_CAP = "lineCap",
  LINE_JOIN = "lineJoin",
}

export interface WallOptions {
  logger: pino.Logger;
  config: Config;
}

export type ContextHandler = (v: string | number) => void;

export class Wall {
  private logger: pino.Logger;
  private config: Config;
  private lastHash: string;
  private canvas: Canvas;
  public ctx: CanvasRenderingContext2D;
  private ctxMap: Record<string, ContextHandler>;

  constructor({ logger, config }: WallOptions) {
    this.logger = logger;
    this.config = config;
    this.lastHash = "";
    this.canvas = createCanvas(this.config.width, this.config.height);
    this.ctx = this.canvas.getContext("2d");
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
    this.ctx.lineWidth = 100;
    this.load();
  }

  load() {
    loadImage(`public/${this.config.imageName}`)
      .then((image) => {
        this.ctx.drawImage(image, 0, 0);
        this.lastHash = createHash("sha256")
          .update(this.canvas.toBuffer("image/png").toString())
          .digest("hex");
        this.logger.debug(`Initialized image context`);
      })
      .catch((error) => {
        this.logger.debug("Error opening image");
        this.restore();
      });
  }

  restore() {
    fs.copyFile(
      `public/new-wall.png`,
      `public/${this.config.imageName}`,
      (error: any) => {
        if (error) {
          this.logger.error("There was a problem restoring the wall");
        } else {
          this.logger.info("Wall was missing, but has been restored");
          this.load();
        }
      }
    );
  }

  getHash() {
    return createHash("sha256")
      .update(this.canvas.toBuffer("image/png").toString())
      .digest("hex");
  }

  save(buffer: Buffer, hash: string) {
    this.lastHash = hash;
    fs.writeFileSync(`public/${this.config.imageName}`, buffer);
  }

  sync() {
    const hash = this.getHash();
    if (hash !== this.lastHash) {
      this.save(this.canvas.toBuffer("image/png"), hash);
    }
  }

  setContext(ctx: Record<string, string | number>) {
    for (const key in ctx) {
      if (key in this.ctxMap) {
        this.ctxMap[key](ctx[key]);
      }
    }
  }
}
