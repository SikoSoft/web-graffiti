import pino from "pino";
import { Storage } from "../../spec/Storage";
import { ChannelConfig, ConfigProperties, Palette } from "../../spec/Config";

export class JsonFileStorage implements Storage {
  constructor(private readonly logger: pino.Logger) {}

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
