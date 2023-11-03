import "dotenv/config";

export class Environment {
  public rootPath: {
    client: string;
    config: string;
    public: string;
  };

  constructor() {
    this.rootPath = {
      client: process.env.CLIENT_ROOT || "",
      config: process.env.CONFIG_ROOT || "",
      public: process.env.PUBLIC_ROOT || "",
    };
  }
}
