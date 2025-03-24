import https from "https";
import fs from "fs";
import path from "path";
import pino from "pino";
import { ConfigCore, ConfigProperties, RoleConfig } from "../../spec/Config";
import { ClientMode } from "../../spec/Client";
import { Environment } from "./Environment";
import { Storage } from "../../spec/Storage";

export interface ConfigOptions {
  env: Environment;
  logger: pino.Logger;
  storage: Storage;
}

export class Config extends ConfigCore {
  secureConfig: https.ServerOptions;
  env: Environment;
  //logger: pino.Logger;

  constructor({ env, logger, storage }: ConfigOptions) {
    super({ storage, logger });

    this.secureConfig = {};
    this.env = env;
  }

  /*
  async init() {
    await super.init();
    try {
      const configProperties = await Config.loadConfig(
        path.join(this.env.rootPath.config, "/config.json")
      );

      const verification = Config.validateInput(configProperties);
      if (!verification.isValid) {
        verification.missingProperties.forEach((property) => {
          this.logger.warn(`Property '${property}' is missing from config`);
        });
        throw new Error(`config.json is invalid`);
      }

      this.process(configProperties);

      this.secureConfig = this.server.secure
        ? {
            key: fs.readFileSync(this.server.secureKey),
            cert: fs.readFileSync(this.server.secureCert),
          }
        : {};
    } catch (error) {
      this.logger.error(
        `Encountered an error while trying to load config.json: ${error}`
      );
    }
  }
*/

  static async loadConfig(file: string): Promise<ConfigProperties> {
    try {
      const configJson = fs.readFileSync(file, { encoding: "utf8" });
      return Promise.resolve(JSON.parse(configJson) as ConfigProperties);
    } catch (error) {
      throw new Error(`Error reading config.json: ${error}`);
    }
  }

  getRole(roleId: number): RoleConfig {
    const role = this.roles.find((r) => r.id == roleId);
    if (role) {
      return role;
    }
    return {
      id: -1,
      infinitePaint: false,
      mode: ClientMode.INTERACT,
      resetWall: false,
    };
  }

  getPaintFromRole(role: number): boolean {
    return this.roles.find((r) => r.id == role)?.infinitePaint || false;
  }

  roleIsValid(role: number): boolean {
    return this.roles.filter((r) => r.id === role).length === 1;
  }
}
