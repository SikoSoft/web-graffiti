import pino from "pino";

export enum MiddlewareType {
  ACCESS = "access",
}

export type MiddlewareHandler = (req: any, res: any, next: any) => void;

export interface MiddlewareOptions {
  logger: pino.Logger;
}

export class Middleware {
  logger: pino.Logger;

  constructor({ logger }: MiddlewareOptions) {
    this.logger = logger;
  }

  register(type: MiddlewareType, handler: MiddlewareHandler) {}
}
