import "dotenv/config";
import { Config } from "../server/lib/Config";
import path from "path";
import fs from "fs";
import { ConfigProperty } from "../spec/Config";

console.log("sync dev clients");

const main = async () => {
  const configRoot = process.env.CONFIG_ROOT || "";

  const configFile = path.join(configRoot, "/config.json");
  const config = await Config.loadConfig(configFile);

  const clientRoot = process.env.CLIENT_ROOT || "";

  const cssPath = path.join(clientRoot, "/WebGraffiti.css");

  fs.watch(cssPath, async (event, filename) => {
    console.log("File change detected", event, filename);
    const url = new URL("dev-sync", config[ConfigProperty.WEB_SERVER]);
    await fetch(url.href);
  });
};

main().catch((error) => {
  console.error(`Encountered an error in main process: ${error}`);
});
