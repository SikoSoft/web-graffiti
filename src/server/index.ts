import * as pino from "pino";
import path from "path";
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

  const configRoot = path.join(__dirname, "../../");
  const publicRoot = path.join(__dirname, "../../public");
  const wcRoot = path.join(__dirname, "../../dist");

  const config = new Config({ configRoot, logger });
  config.init();

  const wall = new Wall({ publicRoot, logger, config });
  wall.init();

  const controller = new Controller({
    publicRoot,
    wcRoot,
    config,
    logger,
    wall,
  });
  controller.init();
}

main().catch((error) => {
  logger.error(`Encountered an error in main process: ${error}`);
});
