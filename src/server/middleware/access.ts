import { MiddlewarePayload, MiddlewareTrigger } from "../lib/Middleware";
import { App } from "../models/App";

export default function (app: App) {
  console.log("access middleware entry...");
  app.middleware.register(
    MiddlewareTrigger.CLIENT_CONNECTED,
    async (
      payload: MiddlewarePayload[MiddlewareTrigger.CLIENT_CONNECTED]
    ): Promise<MiddlewarePayload[MiddlewareTrigger.CLIENT_CONNECTED]> => {
      app.logger.info("client connected middleware handler!");

      await Promise.resolve();

      return {
        ...payload,
        client: {
          ...payload.client,
          role: 1,
        },
      };
    }
  );
}
