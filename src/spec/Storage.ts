import { ChannelConfig, Palette, ConfigProperties } from "./Config";

export interface Storage {
  getChannels(): Promise<ChannelConfig[]>;
  getPalettes(): Promise<Palette[]>;
  getConfig(): Promise<ConfigProperties>;
}

export class StorageStub implements Storage {
  async getChannels(): Promise<ChannelConfig[]> {
    return [];
  }

  async getPalettes(): Promise<Palette[]> {
    return [];
  }

  async getConfig(): Promise<ConfigProperties> {
    return {} as ConfigProperties;
  }
}
