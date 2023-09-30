import { ContextType } from "./Wall";

export enum MessageEvent {
  WELCOME = "welcome",
  LINE = "line",
  SET_CONTEXT = "setContext",
  SET_ROLE = "setRole",
  REFILL = "refill",
  PAINT = "paint",
}

export interface MessagePayload {
  [MessageEvent.WELCOME]: {
    id: string;
    width: number;
    height: number;
    paint: number;
    join: number;
  };
  [MessageEvent.LINE]: {
    line: [number, number, number, number];
    id?: string;
  };
  [MessageEvent.SET_CONTEXT]: {
    ctx: Record<ContextType, string | number>;
  };
  [MessageEvent.SET_ROLE]: {
    role: number;
  };
  [MessageEvent.PAINT]: {
    paint: number;
  };
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

export interface PaintMessage {
  event: MessageEvent.PAINT;
  payload: MessagePayload[MessageEvent.PAINT];
}

export type Message =
  | WelcomeMessage
  | SetContextMessage
  | LineMessage
  | PaintMessage;
