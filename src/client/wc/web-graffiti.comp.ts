import { ClientMode } from "../../spec/Client";
import { ConfigCore, ConfigProperties } from "../../spec/Config";
import { WebGraffiti } from "../lib/WebGraffiti";

const config = new ConfigCore();

export class WebGraffitiComponent extends HTMLElement {
  private wg: WebGraffiti;
  private rootElement: HTMLElement;

  constructor() {
    super();
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
    return ["width", "height", "channel", "server"];
  }

  connectedCallback() {
    config.process(process.env.CONFIG_JSON as unknown as ConfigProperties);
    config.mode = ClientMode.SPECTATE;
    config.width = this.hasAttribute("width")
      ? parseInt(this.getAttribute("width") || "320")
      : config.width;
    config.height = this.hasAttribute("height")
      ? parseInt(this.getAttribute("height") || "240")
      : config.height;
    const channelId = this.getChannelId();
    const channel = config.channels.find((channel) => channel.id === channelId);
    if (channel) {
      this.wg.config.channel = channel;
    }
    this.wg.init(this.rootElement, config);
    this.rootElement.style.width = `${config.width}px`;
    this.rootElement.style.height = `${config.height}px`;
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

  getChannelId(): number {
    return this.hasAttribute("channel")
      ? parseInt(this.getAttribute("channel") as string)
      : this.wg.config.defChannel;
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
