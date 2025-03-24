import { ClientMode } from "../../spec/Client";
import {
  ChannelConfig,
  ConfigCore,
  ConfigLogger,
  ConfigProperties,
} from "../../spec/Config";
import { Storage } from "../../spec/Storage";
import { WebGraffiti } from "./WebGraffiti";

export interface ConfigOptions {
  wg: WebGraffiti;
  storage: Storage;
  logger: ConfigLogger;
}

export type ConfigProperty = Partial<ConfigProperties>;

export class Config extends ConfigCore {
  private wg: WebGraffiti;
  public channel: ChannelConfig;

  constructor({ wg, storage, logger }: ConfigOptions) {
    super({ storage, logger });
    this.wg = wg;
    this.channel = this.channels[0];
  }

  async init(): Promise<void> {
    if (Object.keys(this.wg.initConfig).length) {
      Object.assign(this, this.wg.initConfig);
    }

    super.init();
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
