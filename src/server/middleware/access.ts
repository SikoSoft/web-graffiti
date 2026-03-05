import { MiddlewarePayload, MiddlewareTrigger } from "../lib/Middleware";
import { App } from "../models/App";
import { Identity } from "@ss/identity";

export default function (app: App) {
  app.middleware.register(
    MiddlewareTrigger.CLIENT_CONNECTED,
    async (
      payload: MiddlewarePayload[MiddlewareTrigger.CLIENT_CONNECTED]
    ): Promise<MiddlewarePayload[MiddlewareTrigger.CLIENT_CONNECTED]> => {
      app.logger.info(
        `${MiddlewareTrigger.CLIENT_CONNECTED} middleware handler triggered`
      );

      const accessToken = payload.accessToken;
      if (!accessToken) {
        return payload;
      }

      let newRole = payload.config.defRole;
      let tokenAccepted = payload.client.tokenAccepted;

      if (payload.client.tokenProvided) {
        const hasRoleResult = await Identity.hasRole(
          accessToken,
          "webgraffiti-admin"
        );

        if (hasRoleResult.isOk && hasRoleResult.value) {
          tokenAccepted = true;
        } else {
          tokenAccepted = false;
        }
      }
      return {
        ...payload,
        client: {
          ...payload.client,
          role: newRole,
          tokenAccepted,
        },
      };
    }
  );
}
