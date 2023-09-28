import { connection } from "websocket";

export interface ClientOptions {
  id: string;
  //index: number;
  //connection: Connection;
  ip: string;
  joinTime: number;
  paint: number;
  role: number;
  //ctx: CanvasRenderingContext2D;
  connection: connection;
}

export class Client {
  public id: string;
  //public index: number;
  //private connection:
  private ip: string;
  private joinTime: number;
  private paint: number;
  private role: number;
  //private ctx: CanvasRenderingContext2D;
  public connection: connection;

  constructor({
    id,
    //index,
    ip,
    joinTime,
    paint,
    role,
    connection,
  }: ClientOptions) {
    this.id = id;
    //this.index = index;
    // this.connection = connection;
    this.ip = ip;
    this.joinTime = joinTime;
    this.paint = paint;
    this.role = role;
    //this.ctx = {};
    this.connection = connection;
  }
}
