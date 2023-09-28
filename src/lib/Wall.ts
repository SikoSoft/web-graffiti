import {
  Canvas,
  CanvasRenderingContext2D,
  createCanvas,
  loadImage,
} from "canvas";
import { Config } from "./Config";
import fs from "fs";
import SparkMD5 from "spark-md5";
import pino from "pino";

export interface WallOptions {
  logger: pino.Logger;
  config: Config;
}

export class Wall {
  private logger: pino.Logger;
  private config: Config;
  private lastHash: string;
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;

  constructor({ logger, config }: WallOptions) {
    this.logger = logger;
    this.config = config;
    this.lastHash = "";
    this.canvas = createCanvas(this.config.width, this.config.height);
    this.ctx = this.canvas.getContext("2d");
  }

  init() {
    this.ctx.lineWidth = 100;
    this.load();
  }

  load() {
    loadImage(`public/${this.config.imageName}`)
      .then((image) => {
        this.ctx.drawImage(image, 0, 0);
        this.lastHash = SparkMD5.hash(
          this.canvas.toBuffer("image/png").toString()
        );
        this.logger.debug("Initialized image context");
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

  save(buffer: Buffer, hash: string) {
    this.lastHash = hash;
    fs.writeFileSync(`public/${this.config.imageName}`, buffer);
  }

  sync() {
    const buffer = this.canvas.toBuffer("image/png");
    const hash = SparkMD5.hash(buffer.toString());
    if (hash !== this.lastHash) {
      this.save(buffer, hash);
    }
  }
}
