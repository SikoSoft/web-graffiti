import "dotenv/config";
import path from "path";
import { replaceInFile } from "replace-in-file";

console.log("process template...");

const main = async () => {
  const env = process.env.WEBGRAFFITI_ENV || "dev";
  const indexPath = path.join(process.env.CLIENT_ROOT || "", "index.html");

  const options = {
    files: indexPath,
    from: /%WEBGRAFFITI_ENV%/g,
    to: env,
  };

  try {
    await replaceInFile(options);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

main().catch((error) => {
  console.error(`Encountered an error in main process: ${error}`);
});
