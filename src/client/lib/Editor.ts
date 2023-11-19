import { WebGraffiti } from "./WebGraffiti";

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export interface EditorOptions {
  wg: WebGraffiti;
}

export class Editor {
  private wg: WebGraffiti;
  public selected: number;
  public initialized: boolean;
  public enabled: boolean;
  private colors: string[];
  private buttons: HTMLButtonElement[];

  public container: HTMLDivElement;
  public containerInner: HTMLDivElement;
  public paintMeter: HTMLDivElement;
  public palette: HTMLDivElement;
  public handle: HTMLDivElement;
  public paintRemaining: HTMLDivElement;
  public brushTool: HTMLDivElement;
  public brushToolInner: HTMLDivElement;
  public brushPreview: HTMLDivElement;
  public brushSlider: HTMLInputElement;

  constructor({ wg }: EditorOptions) {
    this.wg = wg;
    this.selected = 0;
    this.initialized = false;
    this.enabled = false;
    this.colors = [];
    this.buttons = [];

    this.container = document.createElement("div");
    this.containerInner = document.createElement("div");
    this.paintMeter = document.createElement("div");
    this.palette = document.createElement("div");
    this.handle = document.createElement("div");
    this.paintRemaining = document.createElement("div");
    this.brushTool = document.createElement("div");
    this.brushToolInner = document.createElement("div");
    this.brushPreview = document.createElement("div");
    this.brushSlider = document.createElement("input");
  }

  init(): void {
    this.colors = [...this.wg.config.defColors];

    this.container.className = "webGraffiti__editor";

    this.containerInner.className = "webGraffiti__editor_inner";

    this.paintMeter.className = "webGraffiti__editor_paint_meter";
    this.containerInner.append(this.paintMeter);

    this.palette.className = "webGraffiti__editor_palette";
    this.containerInner.append(this.palette);
    this.container.append(this.containerInner);
    this.wg.rootElement.append(this.container);

    this.handle.className = "webGraffiti__editor_handle";
    this.containerInner.append(this.handle);
    this.palette.innerHTML = "";
    this.colors.forEach((color, index) => {
      this.palette.append(this.setupButton(color, index));
    });
    this.setupPaintMeter();
    this.setupBrushTool();
    this.selectColor(0);
    this.updatePaintMeter();
    this.initialized = true;
  }

  enable(): void {
    if (this.initialized) {
      this.enabled = true;
      this.container.classList.remove("webGraffiti__editor--gone");
    }
  }

  disable(): void {
    if (this.initialized) {
      this.enabled = false;
      this.container.classList.add("webGraffiti__editor--gone");
    }
  }

  setupPaintMeter(): void {
    this.paintRemaining.className = "webGraffiti__editor_paint_remaining";
    this.paintMeter.append(this.paintRemaining);
    this.wg.input.registerClick(this.paintMeter, () => {
      this.wg.client.refill();
    });
  }

  setupBrushTool(): void {
    this.brushTool.className = "webGraffiti__editor_brush";

    this.brushToolInner.className = "webGraffiti__editor_brush_inner";
    this.brushTool.append(this.brushToolInner);

    this.brushPreview.className = "webGraffiti__editor_brush_preview";
    this.brushToolInner.append(this.brushPreview);

    this.brushSlider.className = "webGraffiti_editor_brush_slider";
    this.brushSlider.setAttribute("type", "range");
    this.brushSlider.setAttribute("orient", "vertical");
    this.brushSlider.setAttribute("min", String(this.wg.config.minBrushSize));
    this.brushSlider.setAttribute("max", String(this.wg.config.maxBrushSize));
    this.brushSlider.setAttribute("value", String(this.wg.config.defBrushSize));
    this.brushSlider.addEventListener("input", (event) => {
      const e = event as HTMLElementEvent<HTMLInputElement>;
      this.setBrushSize(e.target ? parseInt(e.target.value) : 0);
    });
    this.brushToolInner.append(this.brushSlider);
    this.containerInner.append(this.brushTool);
  }

  setupButton(buttonColor: string, index: number): Node {
    const button = document.createElement("button");
    button.className = "webGraffiti__color";
    button.setAttribute("data-color", buttonColor);
    button.setAttribute("data-index", String(index));
    button.style.backgroundColor = buttonColor;

    const colorPicker = document.createElement("input");
    colorPicker.className = "webGraffiti__colorPicker";
    colorPicker.setAttribute("type", "color");
    colorPicker.setAttribute("value", buttonColor.substring(0, 7));

    const showColorPicker = () => {
      colorPicker.classList.add("webGraffiti__colorPicker--active");
      colorPicker.showPicker();
      setTimeout(() => {
        colorPicker.showPicker();
      }, 1);
    };
    const hideColorPicker = () => {
      colorPicker.classList.remove("webGraffiti__colorPicker--active");
    };

    colorPicker.addEventListener("change", (event) => {
      const e = event as HTMLElementEvent<HTMLInputElement>;
      this.setButtonColor(index, e.target.value);
      hideColorPicker();
    });
    colorPicker.addEventListener("blur", () => {
      hideColorPicker();
    });

    button.append(colorPicker);

    button.addEventListener("mousedown", () => {
      this.selectColor(index);
      if (this.wg.input.doubleClick) {
        console.log("caught a double click");
        showColorPicker();
      }
    });
    button.addEventListener("touchstart", () => {
      this.selectColor(index);
    });

    this.buttons[index] = button;
    return button;
  }

  setButtonColor(index: number, color: string) {
    console.log("setButtonColor", index, color);
    this.colors[index] = color;
    this.buttons[index].style.backgroundColor = color;
    this.buttons[index].setAttribute("data-color", color);
    this.selectColor(index);
  }

  selectColor(index: number) {
    this.selected = index;
    this.wg.client.setColor(this.colors[index]);
    document.querySelectorAll(".webGraffiti__color").forEach((button) => {
      if (parseInt(button.getAttribute("data-index") || "") === index) {
        button.classList.add("webGraffiti__color--active");
      } else {
        button.classList.remove("webGraffiti__color--active");
      }
    });
    this.updateBrushPreview();
    this.paintRemaining.style.backgroundColor = this.colors[this.selected];
  }

  setBrushSize(size: number) {
    this.wg.client.setLineWidth(size);
    this.updateBrushPreview();
  }

  updateBrushPreview() {
    this.brushPreview.style.backgroundColor = this.colors[this.selected];
    this.brushPreview.style.width = `${this.wg.client.ctx.lineWidth}px`;
    this.brushPreview.style.height = `${this.wg.client.ctx.lineWidth}px`;
  }

  updatePaintMeter() {
    const height =
      (this.wg.client.paint / this.wg.config.channel.paintVolume) * 100;
    this.paintRemaining.style.height = `${height}%`;
  }

  hideAllColorPickers() {
    this.buttons.forEach((button) => {
      //button.
    });
  }
}
