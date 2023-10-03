import https from "https";
import fs from "fs";
import path from "path";
//import configJson from "../../config.json";
import pino from "pino";

//const configProperties = configJson as ConfigProperties;

export interface Role {
  id: number;
  infinitePaint: boolean;
}

export interface ConfigProperties {
  server: {
    secure: boolean;
    secureKey: string;
    secureCert: string;
    webPort: number;
    webSocketPort: number;
    autoSave: number;
    paintRefill: number;
    status: number;
  };
  imageName: string;
  width: number;
  height: number;
  webServer: string;
  wsServer: string;
  doubleClick: number;
  paintVolume: number;
  paintTime: number;
  defAlpha: number;
  minBrushSize: number;
  maxBrushSize: number;
  defBrushSize: number;
  defaultColors: string[];
  roles: Role[];
}

export interface ConfigOptions {
  configRoot: string;
  logger: pino.Logger;
}

export class Config implements ConfigProperties {
  server: {
    secure: boolean;
    secureKey: string;
    secureCert: string;
    webPort: number;
    webSocketPort: number;
    autoSave: number;
    paintRefill: number;
    status: number;
  };
  imageName: string;
  width: number;
  height: number;
  webServer: string;
  wsServer: string;
  doubleClick: number;
  paintVolume: number;
  paintTime: number;
  defAlpha: number;
  minBrushSize: number;
  maxBrushSize: number;
  defBrushSize: number;
  defaultColors: string[];
  roles: Role[];

  secureConfig: https.ServerOptions;
  configRoot: string;
  logger: pino.Logger;

  constructor({ configRoot, logger }: ConfigOptions) {
    this.server = {
      secure: false,
      secureKey: "",
      secureCert: "",
      webPort: 80,
      webSocketPort: 8666,
      autoSave: 3600000,
      paintRefill: 333,
      status: 300000,
    };
    this.imageName = "";
    this.width = 1920;
    this.height = 1080;
    this.webServer = "";
    this.wsServer = "";
    this.doubleClick = 100;
    this.paintVolume = 10000;
    this.paintTime = 10000;
    this.defAlpha = 1;
    this.minBrushSize = 1;
    this.maxBrushSize = 10;
    this.defBrushSize = 3;
    this.defaultColors = [];
    this.roles = [];

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

  getPaintFromRole(role: number): boolean {
    return this.roles.find((r) => r.id == role)?.infinitePaint || false;
  }

  roleIsValid(role: number): boolean {
    return this.roles.filter((r) => r.id === role).length === 1;
  }
}
