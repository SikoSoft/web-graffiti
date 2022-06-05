const width = 320;
const height = 240;

export class WebGraffitiCanvas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(this.template().content.cloneNode(true));
    this.canvas = this.shadowRoot.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.setAttribute("width", width);
    this.canvas.setAttribute("height", height);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChanged", name, oldValue, newValue);
  }

  template() {
    const template = document.createElement("template");
    template.innerHTML = this.render();
    return template;
  }

  render() {
    return `
      <style>
        canvas {
          background-color: #fff;
        }
      </style>
      <canvas></canvas>
    `;
  }
}

customElements.define("web-graffiti-canvas", WebGraffitiCanvas);
