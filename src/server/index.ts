import * as pino from "pino";
import { Config } from "./lib/Config";
import { Controller } from "./lib/Controller";
import { Wall } from "./lib/Wall";
import { Environment } from "./lib/Environment";
import { Access } from "./lib/Access";
import * as fs from "fs";
import * as path from "path";
import { App } from "./models/App";
import { Middleware } from "./lib/Middleware";

const logger = pino.pino({
  name: "web-graffiti",
  level: "debug",
  formatters: {
    bindings: (bindings) => ({}),
  },
});

async function loadMiddlewares(app: App): Promise<void> {
  console.log("Loading middlewares...");
  const middlewareDir = path.join(app.env.rootPath.server, "/middleware");
  console.log(`Middleware directory: ${middlewareDir}`);
  const files = fs.readdirSync(middlewareDir);

  for (const file of files) {
    if (file.endsWith(".js")) {
      console.log(`Loading middleware: ${file}`);
      const middleware = await import(path.join(middlewareDir, file));
      if (typeof middleware.default === "function") {
        //app.use(middleware.default);
        middleware.default(app);
      }
    }
  }
}

async function main(): Promise<void> {
  logger.info(`Starting Web-Graffiti...`);

  const env = new Environment();

  const config = new Config({ env, logger });
  config.init();

  const access = new Access({ logger, config });

  const middleware = new Middleware({ logger });

  const walls = config.channels.map((channelConfig) => {
    const wall = new Wall({ env, logger, config, channelConfig });
    wall.init();
    return wall;
  });

  const controller = new Controller({
    env,
    config,
    logger,
    walls,
    access,
    middleware,
  });
  controller.init();

  const app: App = {
    env,
    controller,
    access,
    logger,
    middleware,
    use: (module: any) => {
      logger.info(`Using middleware: ${module.name}`);
    },
  };

  await loadMiddlewares(app);
}

main().catch((error) => {
  logger.error(`Encountered an error in main process: ${error}`);
});
