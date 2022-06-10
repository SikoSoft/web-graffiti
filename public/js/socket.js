import magicNum from "./magicNum.js";

export default class socket {
  constructor(wg) {
    this.wg = wg;
    this.sentPerSecond = 0;
    this.receivedPerSecond = 0;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wg.config.wsServer);
      this.ws.onopen = () => {
        resolve();
      };
      this.ws.onerror = () => {
        reject();
      };
      this.ws.onmessage = (message) => {
        this.handleMessage(message);
      };
      this.ws.onclose = () => {
        this.wg.client.connected = false;
      };
    });
  }

  sendMessage(message) {
    this.setSentPerSecond(this.sentPerSecond + 1);
    setTimeout(() => {
      this.setSentPerSecond(this.sentPerSecond - 1);
    }, magicNum.MS_IN_SECOND);
    this.ws.send(JSON.stringify(message));
  }

  handleMessage(message) {
    this.setReceivedPerSecond(this.receivedPerSecond + 1);
    setTimeout(() => {
      this.setReceivedPerSecond(this.receivedPerSecond - 1);
    }, magicNum.MS_IN_SECOND);
    const json = JSON.parse(message.data);
    switch (json.event) {
      case "welcome":
        this.wg.client.id = json.id;
        this.wg.client.setPaint(json.paint);
        this.wg.client.setDelta(Date.now() - json.join);
        this.wg.render.setActualWidth(json.width);
        this.wg.render.setActualHeight(json.height);
        break;
      case "newClient":
        this.wg.registerClient(json.id);
        if (json.ctx) {
          this.wg.setClientContext(json.id, json.ctx);
        }
        break;
      case "setContext":
        this.wg.setClientContext(json.id, json.ctx);
        break;
      case "line":
        this.wg.render.drawLine(
          json.line,
          this.wg.clients.filter((client) => client.id === json.id)[0].ctx
        );
        break;
      case "paint":
        this.wg.client.setPaint(json.paint);
        break;
    }
  }

  setSentPerSecond(number) {
    this.sentPerSecond = number;
    this.wg.useNetworkMonitor &&
      this.wg.networkMonitor.setSentPerSecond(number);
  }

  setReceivedPerSecond(number) {
    this.receivedPerSecond = number;
    this.wg.useNetworkMonitor &&
      this.wg.networkMonitor.setReceivedPerSecond(number);
  }
}
