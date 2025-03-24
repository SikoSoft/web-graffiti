import {
  ChannelConfig,
  Palette,
  ConfigProperties,
  ConfigLogger,
} from "../../spec/Config";
import { Storage } from "../../spec/Storage";

export interface ApiStorageOptions {
  logger: ConfigLogger;
}

export class ApiStorage implements Storage {
  private logger: ConfigLogger;

  constructor({ logger }: ApiStorageOptions) {
    this.logger = logger;
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

    return {} as ConfigProperties;
  }
}
