import { ChannelConfig } from "../../spec/Config";
import { Client } from "./Client";
import { Wall } from "./Wall";

export interface Channel {
  id: number;
  config: ChannelConfig;
  clients: Client[];
  wall: Wall;
}
