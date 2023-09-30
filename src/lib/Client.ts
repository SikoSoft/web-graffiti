import { CanvasRenderingContext2D } from "canvas";
import { connection } from "websocket";
import { Config } from "./Config";

export interface ClientOptions {
  config: Config;
  id: string;
  //index: number;
  //connection: Connection;
  ip: string;
  joinTime: number;
  paint: number;
  role: number;
  //ctx: Record<string, string | number>;
  connection: connection;
}

export class Client {
  private config: Config;
  public id: string;
  //public index: number;
  //private connection:
  private ip: string;
  public joinTime: number;
  public paint: number;
  public role: number;
  public ctx: Record<string, string | number>;
  public connection: connection;

  constructor({
    config,
    id,
    //index,
    ip,
    joinTime,
    paint,
    role,
    connection,
  }: ClientOptions) {
    this.config = config;
    this.id = id;
    //this.index = index;
    // this.connection = connection;
    this.ip = ip;
    this.joinTime = joinTime;
    this.paint = paint;
    this.role = role;
    this.ctx = {};
    this.connection = connection;
  }

  hasInfinitePaint(): boolean {
    return false;
  }
}
