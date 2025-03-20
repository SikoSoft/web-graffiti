import { ClientMode } from "../../spec/Client";
import { ChannelConfig, ConfigCore, ConfigProperties } from "../../spec/Config";
import { WebGraffiti } from "./WebGraffiti";

export interface ConfigOptions {
  wg: WebGraffiti;
}

export type ConfigProperty = Partial<ConfigProperties>;

export class Config extends ConfigCore {
  private wg: WebGraffiti;
  public channel: ChannelConfig;

  constructor({ wg }: ConfigOptions) {
    super();
    this.wg = wg;
    this.channel = this.channels[0];
  }

  async load(initConfig: Partial<ConfigProperties> = {}): Promise<boolean> {
    if (Object.keys(initConfig).length) {
      Object.assign(this, initConfig);
      return true;
    }
    return new Promise((resolve, reject) => {
      fetch(`config/${this.wg.channelId}`)
        .then((response) => response.json())
        .then((configJson) => {
          this.process(configJson as ConfigProperties);
          resolve(true);
        })
        .catch(() => {
          reject();
        });
    });
  }
}
