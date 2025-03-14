import { WebGraffiti } from "./WebGraffiti";

export interface MenuOptions {
  wg: WebGraffiti;
}

export class Menu {
  private wg: WebGraffiti;
  private container: HTMLDivElement;
  private totalClients: HTMLDivElement;

  constructor({ wg }: MenuOptions) {
    this.wg = wg;
    this.container = document.createElement("div");
    this.totalClients = document.createElement("div");
  }

  init(): void {
    console.log("Menu initialized");
    this.container.classList.add("webGraffiti__menu");
    this.wg.rootElement.appendChild(this.container);

    this.totalClients.classList.add("webGraffiti__menu__totalClients");
    this.container.appendChild(this.totalClients);
  }

  setTotalClients(totalClients: number): void {
    this.totalClients.textContent = `${totalClients}`;
  }
}
