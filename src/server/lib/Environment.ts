import "dotenv/config";

export class Environment {
  public rootPath: {
    client: string;
    server: string;
    config: string;
    public: string;
  };

  constructor() {
    this.rootPath = {
      client: process.env.CLIENT_ROOT || "",
      server: process.env.SERVER_ROOT || "",
      config: process.env.CONFIG_ROOT || "",
      public: process.env.PUBLIC_ROOT || "",
    };
  }
}
