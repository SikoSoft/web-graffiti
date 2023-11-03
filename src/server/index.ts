import * as pino from "pino";
import { Config } from "./lib/Config";
import { Controller } from "./lib/Controller";
import { Wall } from "./lib/Wall";
import { Environment } from "./lib/Environment";

const logger = pino.pino({
  name: "web-graffiti",
  level: "debug",
});

async function main(): Promise<void> {
  logger.info(`Starting Web-Graffiti...`);

  const env = new Environment();

  const config = new Config({ env, logger });
  config.init();

  const wall = new Wall({ env, logger, config });
  wall.init();

  const controller = new Controller({
    env,
    config,
    logger,
    wall,
  });
  controller.init();
}

main().catch((error) => {
  logger.error(`Encountered an error in main process: ${error}`);
});
