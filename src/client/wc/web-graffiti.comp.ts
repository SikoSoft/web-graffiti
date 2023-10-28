import { ConfigCore } from "../../spec/Config";
import { WebGraffiti } from "../lib/WebGraffiti";
//import config from "./config.js";

const config = new ConfigCore();

export class WebGraffitiComponent extends HTMLElement {
  private wg: WebGraffiti;
  private rootElement: HTMLElement;

  constructor() {
    super();
    //console.log(`config from process: ${process.env.wgConfig}`);
    this.wg = new WebGraffiti();
    this.attachShadow({ mode: "open" });
    this.rootElement = document.createElement("div");
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.template().content.cloneNode(true));
      const templateElement = this.shadowRoot.querySelector(".web-graffiti");
      if (templateElement) {
        this.rootElement = templateElement as HTMLElement;
      }
    }
  }

  static get observedAttributes() {
    return ["width", "height"];
  }

  connectedCallback() {
    /*
    config.width = this.hasAttribute("width")
      ? parseInt(this.getAttribute("width") || "320")
      : config.width;
    config.height = this.hasAttribute("height")
      ? parseInt(this.getAttribute("height") || "240")
      : config.height;
      */
    this.wg.init(this.rootElement, config); //, config);
  }

  disconnectedCallback() {}

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.wg.render.ready && name === "width") {
      this.setWidth(newValue);
    }
    if (this.wg.render.ready && name === "height") {
      this.setHeight(newValue);
    }
  }

  setWidth(width: string) {
    this.wg.config.width = parseInt(width);
    this.wg.render.setWidth(parseInt(width));
  }

  setHeight(height: string) {
    this.wg.config.height = parseInt(height);
    this.wg.render.setHeight(parseInt(height));
  }

  template() {
    const template = document.createElement("template");
    template.innerHTML = this.render();
    return template;
  }

  render() {
    return `
    <style>
      :host {
        display: inline-block;
      }

      canvas {
        max-width: 100%;
      }
    </style>
    <div class="web-graffiti"></div>
    `;
  }
}

customElements.define("web-graffiti", WebGraffitiComponent);
