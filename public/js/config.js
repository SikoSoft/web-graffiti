export default class config {
  constructor(wg) {
    this.wg = wg;
    this.imageName = 'wall.png';
    this.width = 1280;
    this.height = 720;
    this.mpServer = 'ws://localhost:8666';
  }

  process(override) {
    for (let key in override) {
      this[key] = override[key];
    }
  }

  load() {
    return new Promise((resolve, reject) => {
      fetch('config.json')
        .then((response) => response.json())
        .then((data) => {
          this.process(data);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }
}
