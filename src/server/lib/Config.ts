import https from "https";
import fs from "fs";
import path from "path";
import pino from "pino";
import { ConfigCore, ConfigProperties, Role } from "../../spec/Config";
import { ClientMode } from "../../spec/Client";
import { Environment } from "./Environment";

export interface ConfigOptions {
  env: Environment;
  logger: pino.Logger;
}

export class Config extends ConfigCore {
  secureConfig: https.ServerOptions;
  env: Environment;
  logger: pino.Logger;

  constructor({ env, logger }: ConfigOptions) {
    super();

    this.secureConfig = {};
    this.env = env;
    this.logger = logger;
  }

  init() {
    try {
      this.secureConfig = this.server.secure
        ? {
            key: fs.readFileSync(this.server.secureKey),
            cert: fs.readFileSync(this.server.secureCert),
          }
        : {};

      const configJson = fs.readFileSync(
        path.join(this.env.rootPath.config, "/config.json"),
        { encoding: "utf8" }
      );

      this.process(JSON.parse(configJson) as ConfigProperties);
    } catch (error) {
      this.logger.error(
        `Encountered an error while trying to load config.json: ${error}`
      );
    }
  }

  getRole(roleId: number): Role {
    const role = this.roles.find((r) => r.id == roleId);
    if (role) {
      return role;
    }
    return {
      id: -1,
      infinitePaint: false,
      mode: ClientMode.INTERACT,
    };
  }

  getPaintFromRole(role: number): boolean {
    return this.roles.find((r) => r.id == role)?.infinitePaint || false;
  }

  roleIsValid(role: number): boolean {
    return this.roles.filter((r) => r.id === role).length === 1;
  }
}
