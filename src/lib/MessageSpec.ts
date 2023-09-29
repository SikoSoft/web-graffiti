export enum MessageEvent {
  WELCOME = "welcome",
  LINE = "line",
  SET_CONTEXT = "setContext",
  SET_ROLE = "setRole",
  REFILL = "refill",
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
  };
  [MessageEvent.SET_CONTEXT]: {
    ctx: Record<string, string | number>;
  };
  [MessageEvent.SET_ROLE]: {
    role: number;
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

export type Message = WelcomeMessage | SetContextMessage | LineMessage;
