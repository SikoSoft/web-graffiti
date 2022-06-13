import wg from "../js/webGraffiti.js";
import config from "./config.js";

export class WebGraffiti extends HTMLElement {
  constructor() {
    super();
    this.wg = new wg();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template().content.cloneNode(true));
    this.rootElement = this.shadowRoot.querySelector(".web-graffiti");
  }

  static get observedAttributes() {
    return ["width", "height"];
  }

  connectedCallback() {
    config.width = this.hasAttribute("width")
      ? parseInt(this.getAttribute("width"))
      : config.width;
    config.height = this.hasAttribute("height")
      ? parseInt(this.getAttribute("height"))
      : config.height;
    this.wg.init(this.rootElement, config);
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.wg.render.ready && name === "width") {
      this.setWidth(newValue);
    }
    if (this.wg.render.ready && name === "height") {
      this.setHeight(newValue);
    }
  }

  setWidth(width) {
    this.wg.config.width = parseInt(width);
    this.wg.render.setWidth(width);
  }

  setHeight(height) {
    this.wg.config.height = parseInt(height);
    this.wg.render.setHeight(height);
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
    </style>
    <div class="web-graffiti"></div>
    `;
  }
}

customElements.define("web-graffiti", WebGraffiti);
