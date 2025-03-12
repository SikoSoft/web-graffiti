import pino from "pino";
import { Config } from "./Config";
import { ConfigProperty } from "../../spec/Config";

export interface AccessOptions {
  logger: pino.Logger;
  config: Config;
}

export class Access {
  logger: pino.Logger;
  config: Config;

  constructor({ logger, config }: AccessOptions) {
    this.logger = logger;
    this.config = config;
  }

  async getRoleFromAccessToken(): Promise<number> {
    return this.config[ConfigProperty.DEF_ROLE];
  }
}
