import "dotenv/config";
import * as pino from "pino";
import { Config } from "./lib/Config";
import configJson from "../config.json";
import { Client } from "./lib/Client";
import { Controller } from "./lib/Controller";
import { Wall } from "./lib/Wall";

const staticRoot = process.env.STATIC_ROOT || "";
const config = configJson as Config;

const logger = pino.pino({
  name: "web-graffiti",
  level: "debug",
});

async function main(): Promise<void> {
  logger.info("Starting Web-Graffiti...");

  const wall = new Wall({ logger, config });
  wall.init();

  const controller = new Controller({ staticRoot, config, logger, wall });
  controller.init();
}

//setInterval(sync, config.server.autoSave);

main().catch((error) => {
  logger.error(`Encountered an error in main process: ${error}`);
});
