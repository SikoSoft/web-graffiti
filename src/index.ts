import * as pino from "pino";
import { Config } from "./lib/Config";

import { Client } from "./lib/Client";
import { Controller } from "./lib/Controller";
import { Wall } from "./lib/Wall";

const logger = pino.pino({
  name: "web-graffiti",
  level: "debug",
});

async function main(): Promise<void> {
  logger.info("Starting Web-Graffiti...");

  const config = new Config({ logger });
  config.init();

  const wall = new Wall({ logger, config });
  wall.init();

  const controller = new Controller({ config, logger, wall });
  controller.init();
}

main().catch((error) => {
  logger.error(`Encountered an error in main process: ${error}`);
});
