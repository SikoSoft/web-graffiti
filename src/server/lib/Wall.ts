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
import path from "path";
import { ContextHandler, ContextType } from "../../spec/Canvas";
import { Environment } from "./Environment";
import { ChannelConfig } from "../../spec/Config";

export interface WallOptions {
  env: Environment;
  logger: pino.Logger;
  config: Config;
  channelConfig: ChannelConfig;
}

export class Wall {
  private env: Environment;
  private logger: pino.Logger;
  private config: Config;
  public channelConfig: ChannelConfig;
  private lastHash: string;
  private canvas: Canvas;
  public ctx: CanvasRenderingContext2D;
  private ctxMap: Record<string, ContextHandler>;

  constructor({ env, logger, config, channelConfig }: WallOptions) {
    this.env = env;
    this.logger = logger;
    this.config = config;
    this.channelConfig = channelConfig;
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
    loadImage(path.join(this.env.rootPath.client, this.channelConfig.imageName))
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
      path.join(this.env.rootPath.client, "new-wall.png"),
      path.join(this.env.rootPath.client, this.channelConfig.imageName),
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
    this.logger.info(`Saving image (hash: ${hash})`);
    this.lastHash = hash;
    fs.writeFileSync(
      path.join(this.env.rootPath.client, this.channelConfig.imageName),
      buffer
    );
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
        //this.logger.debug(`${key} exists in ctxMap: ${ctx[key]}`);
        this.ctxMap[key](ctx[key]);
      }
    }
  }
}
