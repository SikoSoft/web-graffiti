const width = 320;
const height = 240;

export class WebGraffitiCanvasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(this.template().content.cloneNode(true));
      const canvas = this.shadowRoot.querySelector("canvas");
      //this.ctx = canvas.getContext("2d");
      if (canvas) {
        canvas.setAttribute("width", String(width));
        canvas.setAttribute("height", String(height));
      }
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
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

customElements.define("web-graffiti-canvas", WebGraffitiCanvasComponent);
