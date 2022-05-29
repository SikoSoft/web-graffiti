import { WebGraffitiCanvas } from "./web-graffiti-canvas.comp.js";

const props = { width: Number, height: Number };

export class WebGraffiti extends HTMLElement {
  constructor() {
    super();
    this.props = {};
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template().content.cloneNode(true));
    this.canvas = this.shadowRoot.querySelector("web-graffiti-canvas");
  }

  static get observedAttributes() {
    return ["width", "height"];
  }

  connectedCallback() {
    console.log("connected");
    //this.setupProps();
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChanged", name, oldValue, newValue);
    this.props[name] = this.formatProp(name, newValue);
  }

  formatProp(name, value) {
    switch (props[name]) {
      case Number:
        return parseInt(value);
      default:
        return value;
    }
  }

  setupProps() {
    for (const propName of observedAttributes) {
      const value = this.getAttribute(propName);
      console.log("setupProp", propName, value, this);
    }
  }

  template() {
    const template = document.createElement("template");
    template.innerHTML = this.render();
    return template;
  }

  render() {
    return `
    <div class="web-graffiti">
      <web-graffiti-canvas width="${this.props.width}" height="${this.props.height}"/>
    </div>
    `;
  }
}

customElements.define("web-graffiti", WebGraffiti);
