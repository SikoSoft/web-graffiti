import { ClientMode } from "./Client";

export interface Role {
  id: number;
  infinitePaint: boolean;
  mode: ClientMode;
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
  defRole: number;
  roles: Role[];
}

export class ConfigCore implements ConfigProperties {
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
  defRole: number;
  roles: Role[];

  constructor() {
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
    this.wsServer = "http://localhost:8666";
    this.doubleClick = 100;
    this.paintVolume = 10000;
    this.paintTime = 10000;
    this.defAlpha = 1;
    this.minBrushSize = 1;
    this.maxBrushSize = 10;
    this.defBrushSize = 3;
    this.defaultColors = [];
    this.defRole = 0;
    this.roles = [
      {
        id: 0,
        infinitePaint: false,
        mode: ClientMode.INTERACT,
      },
    ];
  }
}
