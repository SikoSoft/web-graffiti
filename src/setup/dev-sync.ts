import * as pino from "pino";
import "dotenv/config";
import { Config } from "../server/lib/Config";
import { ConfigProperty } from "../spec/Config";
import { Environment } from "../server/lib/Environment";
import { JsonFileStorage } from "../server/lib/JsonFileStorage";

const logger = pino.pino({
  name: "web-graffiti-dev-sync",
  level: "debug",
});

const main = async () => {
  const env = new Environment();
  const storage = new JsonFileStorage({ env, logger });
  const config = new Config({ env, logger, storage });
  await config.init();

  const url = new URL("dev-sync", config[ConfigProperty.WEB_SERVER]);

  await fetch(url.href);
};

main().catch((err) => {
  logger.error({ err }, "Encountered an error in main process");
});
