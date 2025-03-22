import "dotenv/config";
import { Config } from "../server/lib/Config";
import path from "path";
import fs from "fs";
import { ConfigProperty } from "../spec/Config";
import { exec } from "child_process";

console.log("sync dev clients");

function runNpmScript(scriptName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = exec(`npm run ${scriptName}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running script "${scriptName}":`, stderr);
        reject(error);
        return;
      }
      console.log(`Output of "${scriptName}":`, stdout);
      resolve();
    });

    // Optional: Log real-time output
    process.stdout?.on("data", (data) => console.log(data.toString()));
    process.stderr?.on("data", (data) => console.error(data.toString()));
  });
}

const main = async () => {
  const configRoot = process.env.CONFIG_ROOT || "";
  const staticRoot = process.env.STATIC_ROOT || "";

  const configFile = path.join(configRoot, "/config.json");
  const config = await Config.loadConfig(configFile);

  const clientRoot = process.env.CLIENT_ROOT || "";

  const cssPath = path.join(clientRoot, "/WebGraffiti.css");
  const indexHtmlPath = path.join(staticRoot, "/index.html");

  const url = new URL("dev-sync", config[ConfigProperty.WEB_SERVER]);

  fs.watch(cssPath, async (event, filename) => {
    console.log(`${cssPath} change detected`, event, filename);
    await fetch(url.href);
  });

  fs.watch(indexHtmlPath, async (event, filename) => {
    console.log(`${indexHtmlPath} change detected`, event, filename);
    await runNpmScript("copy-static");
    await fetch(url.href);
  });
};

main().catch((error) => {
  console.error(`Encountered an error in main process: ${error}`);
});
