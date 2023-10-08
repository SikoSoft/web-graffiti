import { WebGraffiti } from "./WebGraffiti";

export interface LoaderOptions {
  wg: WebGraffiti;
}

export class Loader {
  private wg: WebGraffiti;
  private element: HTMLElement;
  private spinner: HTMLElement;

  constructor({ wg }: LoaderOptions) {
    this.wg = wg;
    this.element = document.createElement("div");
    this.spinner = document.createElement("div");
  }

  init() {
    this.element.className = "webGraffiti__loader";
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
