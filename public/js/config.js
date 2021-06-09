export default class config {
  constructor(wg) {
    this.wg = wg;
    this.imageName = 'wall.png';
    this.width = 1280;
    this.height = 720;
    this.doubleClick = 200;
    this.defaultAlpha = 1;
    this.minBrushSize = 1;
    this.maxBrushSize = 10;
    this.defBrushSize = 1;
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
