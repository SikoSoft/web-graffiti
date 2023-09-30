export interface Role {
  id: number;
  infinitePaint: boolean;
}

export interface Config {
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
