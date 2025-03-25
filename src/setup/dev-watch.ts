import * as pino from "pino";
import "dotenv/config";
import { Config } from "../server/lib/Config";
import path from "path";
import fs from "fs";
import { ConfigProperty } from "../spec/Config";
import { exec } from "child_process";
import { Environment } from "../server/lib/Environment";
import { JsonFileStorage } from "../server/lib/JsonFileStorage";

const logger = pino.pino({
  name: "web-graffiti-dev-watch",
  level: "debug",
});

function runNpmScript(scriptName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = exec(`npm run ${scriptName}`, (error, stdout, stderr) => {
      if (error) {
        logger.error(`Error running script "${scriptName}":`, stderr);
        reject(error);
        return;
      }
      logger.info(`Output of "${scriptName}":`, stdout);
      resolve();
    });

    process.stdout?.on("data", (data) => logger.info(data.toString()));
    process.stderr?.on("data", (data) => logger.error(data.toString()));
  });
}

const main = async () => {
  const env = new Environment();
  const storage = new JsonFileStorage({ env, logger });
  const config = new Config({ env, logger, storage });

  const cssPath = path.join(env.rootPath.client, "/WebGraffiti.css");
  const indexHtmlPath = path.join(env.rootPath.static, "/index.html");

  const url = new URL("dev-sync", config[ConfigProperty.WEB_SERVER]);

  fs.watch(cssPath, async (event, filename) => {
    logger.info(`${cssPath} change detected`, event, filename);
    await fetch(url.href);
  });

  fs.watch(indexHtmlPath, async (event, filename) => {
    logger.info(`${indexHtmlPath} change detected`, event, filename);
    await runNpmScript("copy-static");
    await fetch(url.href);
  });
};

main().catch((err) => {
  logger.error({ err }, "Encountered an error in main process");
});
