import { WebGraffiti } from "./WebGraffiti";

export interface UserPortalElement extends HTMLElement {
  showLoginForm: () => void;
}

export interface MenuOptions {
  wg: WebGraffiti;
}

export class Menu {
  private wg: WebGraffiti;
  private container: HTMLDivElement;
  private totalClients: HTMLDivElement;
  private options: HTMLDivElement[];

  constructor({ wg }: MenuOptions) {
    this.wg = wg;
    this.container = document.createElement("div");
    this.totalClients = document.createElement("div");
    this.options = [];
  }

  init(): void {
    this.container.classList.add("webGraffiti__menu");
    this.wg.rootElement.appendChild(this.container);

    this.totalClients.classList.add("webGraffiti__menu_totalClients");
    this.registerOption(this.totalClients);
  }

  setTotalClients(totalClients: number): void {
    this.totalClients.classList.remove("singular", "plural");
    this.totalClients.classList.add(totalClients > 1 ? "plural" : "singular");
    this.totalClients.textContent = `${totalClients}`;
  }

  registerOption(node: HTMLDivElement): void {
    console.log("registerOption", node);
    this.container.appendChild(node);
  }
}
