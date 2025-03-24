import pino from "pino";
import { Storage } from "../../spec/Storage";
import {
  ChannelConfig,
  ConfigLogger,
  ConfigProperties,
  Palette,
} from "../../spec/Config";
import path from "path";
import fs from "fs";
import { Environment } from "./Environment";

export interface JsonFileStorageOptions {
  logger: ConfigLogger;
  env: Environment;
}

export class JsonFileStorage implements Storage {
  private logger: ConfigLogger;
  private env: Environment;

  constructor({ logger, env }: JsonFileStorageOptions) {
    this.logger = logger;
    this.env = env;
  }

  async getChannels(): Promise<ChannelConfig[]> {
    await Promise.resolve();

    this.logger.info("Getting channels");

    return [];
  }

  async getPalettes(): Promise<Palette[]> {
    await Promise.resolve();

    this.logger.info("Getting palettes");

    return [];
  }

  async getConfig(): Promise<ConfigProperties> {
    await Promise.resolve();

    this.logger.info("Getting channels");

    const file = path.join(this.env.rootPath.config, "/config.json");

    try {
      const configJson = fs.readFileSync(file, { encoding: "utf8" });
      return Promise.resolve(JSON.parse(configJson) as ConfigProperties);
    } catch (error) {
      throw new Error(`Error reading config.json: ${error}`);
    }
  }
}
