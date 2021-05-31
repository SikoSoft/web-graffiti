import magicNum from './magicNum.js';

export default class socket {
  constructor(wg) {
    this.wg = wg;
    this.sentPerSecond = 0;
    this.receivedPerSecond = 0;
  }

  init() {
    return new Promise((resolve) => {
      this.ws = new WebSocket(this.wg.config.mpServer);
      this.ws.onopen = () => {
        this.wg.client.connected = true;
        resolve();
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
      case 'pixel':
        this.wg.render.drawPixel(
          json.x,
          json.y,
          json.r,
          json.g,
          json.b,
          json.a
        );
        break;
    }
  }

  setSentPerSecond(number) {
    this.sentPerSecond = number;
    this.wg.networkMonitor.setSentPerSecond(number);
  }

  setReceivedPerSecond(number) {
    this.receivedPerSecond = number;
    this.wg.networkMonitor.setReceivedPerSecond(number);
  }
}
