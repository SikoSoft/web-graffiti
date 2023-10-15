import { connection } from "websocket";
import { Config } from "./Config";
import { Context, ContextType, initialContext } from "../../spec/Canvas";
import { Role } from "../../spec/Config";

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
  public role: Role;
  public ctx: Context;
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
    this.role = this.config.getRole(this.config.defRole);
    this.ctx = Object.assign({}, initialContext);
    this.connection = connection;
  }

  hasInfinitePaint(): boolean {
    return this.role.infinitePaint;
  }

  setRole(roleId: number): void {
    if (this.config.roleIsValid(roleId)) {
      this.role = this.config.getRole(roleId);
    }
  }

  refillPaint(): void {
    this.paint = this.config.paintVolume;
  }
}
