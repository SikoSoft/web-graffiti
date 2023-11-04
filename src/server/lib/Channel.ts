import { ChannelConfig } from "../../spec/Config";
import { Client } from "./Client";

export interface Channel {
  id: number;
  config: ChannelConfig;
  clients: Client[];
}
