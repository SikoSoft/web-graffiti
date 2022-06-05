import magicNum from "./magicNum.js";

export default class config {
  constructor(wg) {
    this.wg = wg;
    this.imageName = "wall.png";
    this.width = 1280;
    this.height = 720;
    this.doubleClick = 200;
    this.defAlpha = 1;
    this.minBrushSize = 1;
    this.maxBrushSize = 10;
    this.defBrushSize = 1;
    this.mpServer = "ws://localhost:8666";
    this.mode = magicNum.MODE_INTERACTIVE;
    this.allowedInitOverrides = ["width", "height", "mode"];
  }

  process(override, safeMode = false) {
    for (let key in override) {
      if (!safeMode || this.overrideisAllowed(key)) {
        this[key] = override[key];
      }
    }
  }

  overrideisAllowed(key) {
    return this.allowedInitOverrides.indexOf(key) > -1;
  }

  load(initConfig = {}) {
    return new Promise((resolve, reject) => {
      fetch("config.json")
        .then((response) => response.json())
        .then((data) => {
          this.process(data);
          if (Object.keys(initConfig).length) {
            this.process(initConfig, true);
          }
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }
}
