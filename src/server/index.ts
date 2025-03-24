import * as pino from "pino";
import { Config } from "./lib/Config";
import { Controller } from "./lib/Controller";
import { Wall } from "./lib/Wall";
import { Environment } from "./lib/Environment";
import { Access } from "./lib/Access";
import { JsonFileStorage } from "./lib/JsonFileStorage";
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
  const directory = path.join(app.env.rootPath.server, "/middleware");
  app.logger.debug({ directory }, "Scanning for middleware files");
  const files = fs.readdirSync(directory);

  for (const file of files) {
    if (file.endsWith(".js")) {
      app.logger.debug(`Loading middleware: ${file}`);
      const middleware = await import(path.join(directory, file));
      if (typeof middleware.default === "function") {
        middleware.default(app);
      }
    }
  }
}

async function main(): Promise<void> {
  logger.info(`Starting Web-Graffiti...`);

  const env = new Environment();

  const storage = new JsonFileStorage(logger);

  const config = new Config({ env, logger, storage });
  await config.init();

  const access = new Access({ logger, config });

  const middleware = new Middleware({ logger });

  const walls = await Promise.all(
    config.channels.map(async (channelConfig) => {
      const wall = new Wall({ env, logger, config, channelConfig });
      await wall.init();
      return wall;
    })
  );

  const controller = new Controller({
    env,
    config,
    logger,
    walls,
    access,
    middleware,
  });
  await controller.init();

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
