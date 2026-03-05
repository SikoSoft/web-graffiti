import { MiddlewarePayload, MiddlewareTrigger } from "../lib/Middleware";
import { App } from "../models/App";
import { Identity } from "@ss/identity";

export interface ApiResponse<ResponseBodyType> {
  status: number;
  response: ResponseBodyType;
}

export type ApiResult<ResponseBodyType> = ApiResponse<ResponseBodyType> | null;

export const emptyResponseCodes = [202, 204];

export interface RequestConfig {
  method: string | undefined;
  headers: HeadersInit;
  body: BodyInit;
}

export interface ApiConfig {
  authToken: string;
  baseUrl: string;
  errorHandler: () => void;
}

export class Api {
  private authToken: string;
  constructor(private config: ApiConfig) {
    this.authToken = config.authToken;
  }

  async httpRequest<ResponseType>(
    path: string,
    config: RequestInit
  ): Promise<ApiResult<ResponseType>> {
    let json: unknown;

    const headers = new Headers(config.headers);

    headers.append("authorization", this.authToken);

    const url = new URL(path, this.config.baseUrl);
    const request = new Request(url, { ...config, headers });

    try {
      const response = await fetch(request);

      if (response.ok && !emptyResponseCodes.includes(response.status)) {
        json = await response.json();
      }

      if (response.status === 403) {
        this.config.errorHandler();
      }

      return {
        status: response.status,
        response: json as ResponseType,
      };
    } catch (error) {
      console.error(`Api encountered an error performing request:`, error);
    }

    return null;
  }

  async get<ResponseType>(
    path: string,
    config?: RequestInit
  ): Promise<ApiResult<ResponseType>> {
    return await this.httpRequest<ResponseType>(path, {
      method: "get",
      ...config,
    });
  }

  async post<RequestType, ResponseType>(
    path: string,
    body: RequestType,
    config?: RequestInit
  ): Promise<ApiResult<ResponseType>> {
    return await this.httpRequest<ResponseType>(path, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      ...config,
    });
  }

  async put<RequestType, ResponseType>(
    path: string,
    body: RequestType,
    config?: RequestInit
  ): Promise<ApiResult<ResponseType>> {
    return await this.httpRequest<ResponseType>(path, {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      ...config,
    });
  }

  async delete<ResponseType>(
    path: string,
    config?: RequestInit
  ): Promise<ApiResult<ResponseType>> {
    return await this.httpRequest<ResponseType>(path, {
      method: "delete",
      ...config,
    });
  }

  setAuthToken(authToken: string): void {
    this.authToken = authToken;
  }
}

export const api = new Api({
  authToken: "",
  baseUrl: process.env.AUTH_SERVER || "",
  errorHandler: () => {
    console.error("Api encountered an error");
  },
});

export interface IntrospectionUser {
  introspection: {
    isLoggedIn: true;
    user: {
      id: string;
      sessionId: string;
      roles: string[];
    };
    expiresAt: Date;
  };
}

export interface IntrospectionAnonymous {
  introspection: {
    isLoggedIn: false;
  };
}

export type Introspection = IntrospectionUser | IntrospectionAnonymous;

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

      //api.setAuthToken(payload.accessToken || "");
      //const result = await api.get<Introspection>("user/introspect");

      const hasRoleResult = await Identity.hasRole(
        accessToken,
        "webgraffiti-admin"
      );

      let newRole = payload.config.defRole;
      let tokenAccepted = payload.client.tokenAccepted;

      if (hasRoleResult.isOk && hasRoleResult.value) {
        tokenAccepted = true;
      } else {
        tokenAccepted = false;
      }

      /*
      if (result && result.status === 403) {
        tokenAccepted = false;
      }

      console.log("result", result);

      if (result && result.response) {
        console.log("result", result);
        if (
          result.response.introspection.isLoggedIn &&
          result.response.introspection.user.roles.includes("webgraffiti-admin")
        ) {
          newRole = 1;
        }
      }

      */

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
