import { Context, Line } from "./Canvas";
import { ClientMode } from "./Client";

export enum MessageEvent {
  WELCOME = "welcome",
  LINE = "line",
  SET_CONTEXT = "setContext",
  SET_ROLE = "setRole",
  REFILL = "refill",
  PAINT = "paint",
  NEW_CLIENT = "newClient",
  DEV_CLIENT_UPDATE = "devClientUpdate",
}

export interface MessagePayload {
  [MessageEvent.WELCOME]: {
    id: string;
    width: number;
    height: number;
    paint: number;
    join: number;
    mode: ClientMode;
  };
  [MessageEvent.LINE]: {
    line: Line;
    id?: string;
  };
  [MessageEvent.SET_CONTEXT]: {
    ctx: Context;
    id?: string;
  };
  [MessageEvent.SET_ROLE]: {
    role: number;
  };
  [MessageEvent.REFILL]: {};
  [MessageEvent.PAINT]: {
    paint: number;
  };
  [MessageEvent.NEW_CLIENT]: {
    id: string;
    ctx?: Context;
  };
  [MessageEvent.DEV_CLIENT_UPDATE]: {};
}

export interface WelcomeMessage {
  event: MessageEvent.WELCOME;
  payload: MessagePayload[MessageEvent.WELCOME];
}

export interface SetContextMessage {
  event: MessageEvent.SET_CONTEXT;
  payload: MessagePayload[MessageEvent.SET_CONTEXT];
}

export interface LineMessage {
  event: MessageEvent.LINE;
  payload: MessagePayload[MessageEvent.LINE];
}

export interface RefillMessage {
  event: MessageEvent.REFILL;
  payload: MessagePayload[MessageEvent.REFILL];
}

export interface PaintMessage {
  event: MessageEvent.PAINT;
  payload: MessagePayload[MessageEvent.PAINT];
}

export interface SetRoleMessage {
  event: MessageEvent.SET_ROLE;
  payload: MessagePayload[MessageEvent.SET_ROLE];
}

export interface NewClientMessage {
  event: MessageEvent.NEW_CLIENT;
  payload: MessagePayload[MessageEvent.NEW_CLIENT];
}

export interface DevClientUpdateMessage {
  event: MessageEvent.DEV_CLIENT_UPDATE;
  payload: MessagePayload[MessageEvent.DEV_CLIENT_UPDATE];
}

export type Message =
  | WelcomeMessage
  | SetContextMessage
  | LineMessage
  | PaintMessage
  | SetRoleMessage
  | RefillMessage
  | NewClientMessage
  | DevClientUpdateMessage;
