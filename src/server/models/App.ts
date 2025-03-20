import pino from "pino";
import { Access } from "../lib/Access";
import { Controller } from "../lib/Controller";
import { Middleware } from "../lib/Middleware";
import { Environment } from "../lib/Environment";

export interface App {
  env: Environment;
  logger: pino.Logger;
  controller: Controller;
  middleware: Middleware;
  access: Access;
  use: (module: any) => void;
}
