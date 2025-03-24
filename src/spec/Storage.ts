import { ChannelConfig, Palette, ConfigProperties } from "./Config";

export interface Storage {
  getChannels(): Promise<ChannelConfig[]>;
  getPalettes(): Promise<Palette[]>;
  getConfig(): Promise<ConfigProperties>;
}
