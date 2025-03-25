import {
  ChannelConfig,
  Palette,
  ConfigProperties,
  ConfigLogger,
} from "../../spec/Config";
import { Storage } from "../../spec/Storage";
import { WebGraffiti } from "./WebGraffiti";

export interface ApiStorageOptions {
  logger: ConfigLogger;
  wg: WebGraffiti;
}

export class ApiStorage implements Storage {
  private wg: WebGraffiti;
  private logger: ConfigLogger;

  constructor({ logger, wg }: ApiStorageOptions) {
    this.wg = wg;
    this.logger = logger;
  }

  async getChannels(): Promise<ChannelConfig[]> {
    await Promise.resolve();

    this.logger.info("Getting channels");

    return [];
  }

  async getPalettes(): Promise<Palette[]> {
    let json: unknown;
    this.logger.info("Getting palettes");
    try {
      const response = await fetch(`config/${this.wg.channelId}/palettes`);
      json = await response.json();
    } catch (error) {
      this.logger.error(
        `Encountered an error while trying to load config ${error}`
      );
    }
    return json as Palette[];
  }

  async getConfig(): Promise<ConfigProperties> {
    this.logger.info("Getting config");
    let json: unknown;
    try {
      const response = await fetch(`config/${this.wg.channelId}`);
      json = await response.json();
    } catch (error) {
      this.logger.error(
        `Encountered an error while trying to load config ${error}`
      );
    }

    return json as ConfigProperties;
  }
}
