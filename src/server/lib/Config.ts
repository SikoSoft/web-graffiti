import https from "https";
import fs from "fs";
import path from "path";
import pino from "pino";
import { ConfigCore, ConfigProperties, Role } from "../../spec/Config";
import { ClientMode } from "../../spec/Client";

export interface ConfigOptions {
  configRoot: string;
  logger: pino.Logger;
}

export class Config extends ConfigCore {
  secureConfig: https.ServerOptions;
  configRoot: string;
  logger: pino.Logger;

  constructor({ configRoot, logger }: ConfigOptions) {
    super();

    this.secureConfig = {};
    this.configRoot = configRoot;
    this.logger = logger;
  }

  init() {
    this.secureConfig = this.server.secure
      ? {
          key: fs.readFileSync(this.server.secureKey),
          cert: fs.readFileSync(this.server.secureCert),
        }
      : {};

    try {
      const configJson = fs.readFileSync(
        path.join(this.configRoot, "/config.json"),
        { encoding: "utf8" }
      );
      const configProperties: ConfigProperties = JSON.parse(
        configJson
      ) as ConfigProperties;

      Object.assign(this, configProperties);
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
