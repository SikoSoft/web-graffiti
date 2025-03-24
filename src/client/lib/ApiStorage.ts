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
    await Promise.resolve();

    this.logger.info("Getting palettes");

    return [];
  }

  async getConfig(): Promise<ConfigProperties> {
    let json: unknown;
    this.logger.info("Getting config");

    /*
    if (Object.keys(initConfig).length) {
      Object.assign(this, initConfig);
      return true;
    }
*/

    try {
      const response = await fetch(`config/${this.wg.channelId}`);
      json = response.json();

      /*
        .then((configJson) => {
          this.process(configJson as ConfigProperties);
          resolve(true);
        })
        .catch(() => {
          reject();
        });

    });
    */
    } catch (error) {
      this.logger.error(
        `Encountered an error while trying to load config.json: ${error}`
      );
    }

    return json as ConfigProperties;
  }
}
