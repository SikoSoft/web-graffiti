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
    this.wg.init(this.rootElement, config);
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.wg.render.ready && name === "width") {
      this.wg.config.width = parseInt(newValue);
      this.wg.render.setWidth(newValue);
    }
    if (this.wg.render.ready && name === "height") {
      this.wg.config.height = parseInt(newValue);
      this.wg.render.setHeight(newValue);
    }
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
