import { WebGraffiti } from "./WebGraffiti";

export interface MenuOptions {
  wg: WebGraffiti;
}

export class Menu {
  private wg: WebGraffiti;

  constructor({ wg }: MenuOptions) {
    this.wg = wg;
  }

  init(): void {
    console.log("Menu initialized");
    const menu = document.createElement("div");
    menu.classList.add("webGraffiti__menu");
    this.wg.rootElement.appendChild(menu);
  }
}
