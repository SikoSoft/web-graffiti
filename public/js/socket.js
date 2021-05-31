export default class socket {
  constructor(wg) {
    this.wg = wg;
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
    this.ws.send(JSON.stringify(message));
  }

  handleMessage(message) {
    const json = JSON.parse(message.data);
    switch (json.event) {
      case 'pixel':
        this.wg.drawPixel(json.x, json.y, json.r, json.g, json.b, json.a);
        break;
    }
  }
}
