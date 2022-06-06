export default class loader {
  constructor(wg) {
    this.wg = wg;
  }

  init() {
    this.element = document.createElement("div");
    this.element.className = "webGraffiti__loader";
    this.spinner = document.createElement("div");
    this.spinner.className = "webGraffiti__loader_spinner";
    this.element.append(this.spinner);
    this.wg.rootElement.append(this.element);
  }

  show() {
    this.element.classList.add("webGraffiti__loader--shown");
  }

  hide() {
    this.element.classList.remove("webGraffiti__loader--shown");
  }
}
