export enum ContextType {
  STROKE_STYLE = "strokeStyle",
  LINE_WIDTH = "lineWidth",
  LINE_CAP = "lineCap",
  LINE_JOIN = "lineJoin",
}

export type Context = Record<ContextType, string | number>;

export type ContextHandler = (v: string | number) => void;

export const initialContext: Context = {
  [ContextType.LINE_CAP]: "round",
  [ContextType.LINE_JOIN]: "round",
  [ContextType.LINE_WIDTH]: 3,
  [ContextType.STROKE_STYLE]: "#000000",
};

export interface Coord {
  x: number;
  y: number;
}

export type Line = [number, number, number, number];
