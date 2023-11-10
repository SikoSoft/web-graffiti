import { connection } from "websocket";
import { Config } from "./Config";
import { Context, initialContext } from "../../spec/Canvas";
import { Role } from "../../spec/Config";
import { Channel } from "./Channel";

export interface ClientOptions {
  config: Config;
  id: string;
  ip: string;
  joinTime: number;
  paint: number;
  role: number;
  connection: connection;
  channel: Channel;
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
  public channel: Channel;
  public hasUnsavedEdits: boolean;

  constructor({
    config,
    id,
    ip,
    joinTime,
    paint,
    role,
    connection,
    channel,
  }: ClientOptions) {
    this.config = config;
    this.id = id;
    this.ip = ip;
    this.joinTime = joinTime;
    this.paint = paint;
    this.role = this.config.getRole(this.config.defRole);
    this.ctx = Object.assign({}, initialContext);
    this.connection = connection;
    this.channel = channel;
    this.hasUnsavedEdits = false;
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
    this.paint = this.channel.config.paintVolume;
  }
}
