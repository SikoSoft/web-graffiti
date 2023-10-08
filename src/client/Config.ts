import { ClientMode } from "../spec/Client";
import { ConfigCore } from "../spec/Config";
import { WebGraffiti } from "./WebGraffiti";

export interface ConfigOptions {
  wg: WebGraffiti;
}

export class Config extends ConfigCore {
  private wg: WebGraffiti;

  public mode: ClientMode;
  private allowedInitOverrides: string[];

  constructor({ wg }: ConfigOptions) {
    super();
    this.wg = wg;

    this.mode = ClientMode.INTERACT;
    this.allowedInitOverrides = ["width", "height", "mode"];
  }

  process(
    override: Record<string, string | number>,
    safeMode: boolean = false
  ) {
    for (let key in override) {
      if (!safeMode || this.overrideisAllowed(key)) {
        //this[key] = override[key];
      }
    }
  }

  overrideisAllowed(key: string): boolean {
    return this.allowedInitOverrides.indexOf(key) > -1;
  }

  async load(initConfig = {}): Promise<boolean> {
    if (Object.keys(initConfig).length) {
      this.process(initConfig);
      return true;
    }
    return new Promise((resolve, reject) => {
      fetch("config.json")
        .then((response) => response.json())
        .then((data) => {
          this.process(data);
          if (Object.keys(initConfig).length) {
            this.process(initConfig, true);
          }
          resolve(true);
        })
        .catch(() => {
          reject();
        });
    });
  }
}
