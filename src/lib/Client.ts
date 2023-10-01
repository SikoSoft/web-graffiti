import { connection } from "websocket";
import { Config } from "./Config";

export interface ClientOptions {
  config: Config;
  id: string;
  ip: string;
  joinTime: number;
  paint: number;
  role: number;
  connection: connection;
}

export class Client {
  private config: Config;
  public id: string;
  private ip: string;
  public joinTime: number;
  public paint: number;
  public role: number;
  public ctx: Record<string, string | number>;
  public connection: connection;

  constructor({
    config,
    id,
    ip,
    joinTime,
    paint,
    role,
    connection,
  }: ClientOptions) {
    this.config = config;
    this.id = id;
    this.ip = ip;
    this.joinTime = joinTime;
    this.paint = paint;
    this.role = role;
    this.ctx = {};
    this.connection = connection;
  }

  hasInfinitePaint(): boolean {
    return this.config.getPaintFromRole(this.role);
  }

  setRole(role: number): void {
    if (this.config.roleIsValid(role)) {
      this.role = role;
    }
  }

  refillPaint() {
    this.paint = this.config.paintVolume;
  }
}
