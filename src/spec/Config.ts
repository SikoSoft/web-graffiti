import { ClientMode } from "./Client";

export enum RoleConfigProperty {
  ID = "id",
  INFINITE_PAINT = "infinitePaint",
  MODE = "mode",
}

export interface RoleConfig {
  [RoleConfigProperty.ID]: number;
  [RoleConfigProperty.INFINITE_PAINT]: boolean;
  [RoleConfigProperty.MODE]: ClientMode;
}

export enum ServerConfigProperty {
  SECURE = "secure",
  SECURE_KEY = "secureKey",
  SECURE_CERT = "secureCert",
  WEB_PORT = "webPort",
  WEB_SOCKET_PORT = "webSocketPort",
  AUTO_SAVE = "autoSave",
  STATUS = "status",
}

export interface ServerConfig {
  [ServerConfigProperty.SECURE]: boolean;
  [ServerConfigProperty.SECURE_KEY]: string;
  [ServerConfigProperty.SECURE_CERT]: string;
  [ServerConfigProperty.WEB_PORT]: number;
  [ServerConfigProperty.WEB_SOCKET_PORT]: number;
  [ServerConfigProperty.AUTO_SAVE]: number;
  [ServerConfigProperty.STATUS]: number;
}

export enum ChannelConfigProperty {
  ID = "id",
  IMAGE_NAME = "imageName",
  PAINT_VOLUME = "paintVolume",
  PAINT_TIME = "paintTime",
  PAINT_REFILL = "paintRefill",
}

export interface ChannelConfig {
  [ChannelConfigProperty.ID]: number;
  [ChannelConfigProperty.IMAGE_NAME]: string;
  [ChannelConfigProperty.PAINT_VOLUME]: number;
  [ChannelConfigProperty.PAINT_TIME]: number;
  [ChannelConfigProperty.PAINT_REFILL]: number;
}

export enum ConfigProperty {
  SERVER = "server",
  IMAGE_NAME = "imageName",
  WIDTH = "width",
  HEIGHT = "height",
  WEB_SERVER = "webServer",
  WS_SERVER = "wsServer",
  DOUBLE_CLICK = "doubleClick",
  DEF_ALPHA = "defAlpha",
  MIN_BRUSH_SIZE = "minBrushSize",
  MAX_BRUSH_SIZE = "maxBrushSize",
  DEF_BRUSH_SIZE = "defBrushSize",
  DEF_COLORS = "defColors",
  DEF_ROLE = "defRole",
  ROLES = "roles",
  MODE = "mode",
  CHANNELS = "channels",
  DEF_CHANNEL = "defChannel",
}

export interface ConfigProperties {
  [ConfigProperty.SERVER]: ServerConfig;
  [ConfigProperty.IMAGE_NAME]: string;
  [ConfigProperty.WIDTH]: number;
  [ConfigProperty.HEIGHT]: number;
  [ConfigProperty.WEB_SERVER]: string;
  [ConfigProperty.WS_SERVER]: string;
  [ConfigProperty.DOUBLE_CLICK]: number;
  [ConfigProperty.DEF_ALPHA]: number;
  [ConfigProperty.MIN_BRUSH_SIZE]: number;
  [ConfigProperty.MAX_BRUSH_SIZE]: number;
  [ConfigProperty.DEF_BRUSH_SIZE]: number;
  [ConfigProperty.DEF_COLORS]: string[];
  [ConfigProperty.DEF_ROLE]: number;
  [ConfigProperty.ROLES]: RoleConfig[];
  [ConfigProperty.MODE]: ClientMode;
  [ConfigProperty.CHANNELS]: ChannelConfig[];
  [ConfigProperty.DEF_CHANNEL]: number;
}

export class ConfigCore implements ConfigProperties {
  [ConfigProperty.SERVER]: ServerConfig;
  [ConfigProperty.IMAGE_NAME]: string;
  [ConfigProperty.WIDTH]: number;
  [ConfigProperty.HEIGHT]: number;
  [ConfigProperty.WEB_SERVER]: string;
  [ConfigProperty.WS_SERVER]: string;
  [ConfigProperty.DOUBLE_CLICK]: number;
  [ConfigProperty.DEF_ALPHA]: number;
  [ConfigProperty.MIN_BRUSH_SIZE]: number;
  [ConfigProperty.MAX_BRUSH_SIZE]: number;
  [ConfigProperty.DEF_BRUSH_SIZE]: number;
  [ConfigProperty.DEF_COLORS]: string[];
  [ConfigProperty.DEF_ROLE]: number;
  [ConfigProperty.ROLES]: RoleConfig[];
  [ConfigProperty.MODE]: ClientMode;
  [ConfigProperty.CHANNELS]: ChannelConfig[];
  [ConfigProperty.DEF_CHANNEL]: number;

  constructor() {
    this[ConfigProperty.SERVER] = {
      secure: false,
      secureKey: "",
      secureCert: "",
      webPort: 80,
      webSocketPort: 8666,
      autoSave: 3600000,
      status: 300000,
    };
    this[ConfigProperty.IMAGE_NAME] = "";
    this[ConfigProperty.WIDTH] = 1920;
    this[ConfigProperty.HEIGHT] = 1080;
    this[ConfigProperty.WEB_SERVER] = "";
    this[ConfigProperty.WS_SERVER] = "http://localhost:8666";
    this[ConfigProperty.DOUBLE_CLICK] = 100;
    this[ConfigProperty.DEF_ALPHA] = 1;
    this[ConfigProperty.MIN_BRUSH_SIZE] = 1;
    this[ConfigProperty.MAX_BRUSH_SIZE] = 10;
    this[ConfigProperty.DEF_BRUSH_SIZE] = 3;
    this[ConfigProperty.DEF_COLORS] = [];
    this[ConfigProperty.DEF_ROLE] = 0;
    this[ConfigProperty.ROLES] = [
      {
        [RoleConfigProperty.ID]: 0,
        [RoleConfigProperty.INFINITE_PAINT]: false,
        [RoleConfigProperty.MODE]: ClientMode.INTERACT,
      },
    ];
    this[ConfigProperty.MODE] = ClientMode.INTERACT;
    this[ConfigProperty.CHANNELS] = [
      {
        [ChannelConfigProperty.ID]: 0,
        [ChannelConfigProperty.IMAGE_NAME]: "",
        [ChannelConfigProperty.PAINT_VOLUME]: 10000,
        [ChannelConfigProperty.PAINT_TIME]: 10000,
        [ChannelConfigProperty.PAINT_REFILL]: 333,
      },
    ];
    this[ConfigProperty.DEF_CHANNEL] = 0;
  }

  process(configProperties: Partial<ConfigProperties>) {
    Object.assign(this, configProperties);
  }
}
