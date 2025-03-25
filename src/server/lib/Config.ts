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

  constructor({ env, logger, storage }: ConfigOptions) {
    super({ storage, logger });

    this.secureConfig = {};
    this.env = env;
  }

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
