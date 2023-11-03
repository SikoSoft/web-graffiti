import { WebGraffiti } from "./WebGraffiti";

export interface NetworkMonitorOptions {
  wg: WebGraffiti;
}

export class NetworkMonitor {
  private wg: WebGraffiti;

  constructor({ wg }: NetworkMonitorOptions) {
    this.wg = wg;
  }

  init() {}

  setSentPerSecond(number: number) {
    console.log(`setSentPerSecond: ${String(number)}`);
  }

  setReceivedPerSecond(number: number) {
    console.log(`setReceivedPerSecond: ${String(number)}`);
  }
}
/*
export default class NetworkMonitor {
  constructor(wg) {
    this.wg = wg;
  }

  init() {
    this.container = document.createElement("div");
    this.container.className = "webGraffiti__network_monitor";

    this.sentPerSecondContainer = document.createElement("div");
    this.sentPerSecondContainer.className =
      "webGraffiti__network_monitor_sent_per_second";
    this.sentPerSecondValue = document.createElement("span");
    this.sentPerSecondValue.className =
      "webGraffiti__network_monitor_sent_per_second_value";
    this.sentPerSecondContainer.append(this.sentPerSecondValue);
    this.container.append(this.sentPerSecondContainer);

    this.receivedPerSecondContainer = document.createElement("div");
    this.receivedPerSecondContainer.className =
      "webGraffiti__network_monitor_received_per_second";
    this.receivedPerSecondValue = document.createElement("span");
    this.receivedPerSecondValue.className =
      "webGraffiti__network_monitor_received_per_second_value";
    this.receivedPerSecondContainer.append(this.receivedPerSecondValue);
    this.container.append(this.receivedPerSecondContainer);

    this.wg.rootElement.append(this.container);
  }

  setSentPerSecond(number) {
    this.sentPerSecondValue.innerHTML = number;
  }

  setReceivedPerSecond(number) {
    this.receivedPerSecondValue.innerHTML = number;
  }
}
*/
