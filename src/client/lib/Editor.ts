import { WebGraffiti } from "./WebGraffiti";

export const STORAGE_KEY_EDITOR_STATE = "wgEditorState";

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};

export interface EditorOptions {
  wg: WebGraffiti;
}

export interface EditorState {
  selected: number;
  colors: string[];
  palettePosition: number;
  brushSize: number;
}

export class Editor {
  private wg: WebGraffiti;
  private state: EditorState;
  public initialized: boolean;
  public enabled: boolean;
  private buttons: HTMLButtonElement[];

  private scrollTimeout: NodeJS.Timeout | undefined;

  public container: HTMLDivElement;
  public containerInner: HTMLDivElement;
  public paintMeter: HTMLDivElement;
  public palette: HTMLDivElement;
  public paletteContainer: HTMLDivElement;
  public paletteSelector: HTMLSelectElement;
  public handle: HTMLDivElement;
  public paintRemaining: HTMLDivElement;
  public brushTool: HTMLDivElement;
  public brushToolInner: HTMLDivElement;
  public brushPreview: HTMLDivElement;
  public brushSlider: HTMLInputElement;

  constructor({ wg }: EditorOptions) {
    this.wg = wg;
    this.state = {
      selected: 0,
      colors: [],
      palettePosition: 0,
      brushSize: 0,
    };
    this.initialized = false;
    this.enabled = false;
    this.buttons = [];

    this.container = document.createElement("div");
    this.containerInner = document.createElement("div");
    this.paintMeter = document.createElement("div");
    this.palette = document.createElement("div");
    this.paletteContainer = document.createElement("div");
    this.paletteSelector = document.createElement("select");
    this.handle = document.createElement("div");
    this.paintRemaining = document.createElement("div");
    this.brushTool = document.createElement("div");
    this.brushToolInner = document.createElement("div");
    this.brushPreview = document.createElement("div");
    this.brushSlider = document.createElement("input");
  }

  async init(): Promise<void> {
    this.restore();
    if (!this.state.colors.length) {
      this.state.colors = [...this.wg.config.defColors];
    }

    this.container.className = "webGraffiti__editor";
    this.containerInner.className = "webGraffiti__editor_inner";

    this.paintMeter.className = "webGraffiti__editor_paint_meter";
    this.containerInner.append(this.paintMeter);

    this.paletteContainer.className = "webGraffiti__editor_palette_container";
    this.containerInner.append(this.paletteContainer);

    this.paletteSelector.className = "webGraffiti__editor_palette_selector";

    const palettes = await this.wg.config.getPalettes();
    palettes.forEach((palette) => {
      const option = document.createElement("option");
      option.value = String(palette.id);
      option.text = palette.name;
      this.paletteSelector.append(option);
    });

    this.paletteSelector.addEventListener("change", (event) => {
      this.handlePaletteChange(event as HTMLElementEvent<HTMLSelectElement>);
    });
    this.paletteContainer.append(this.paletteSelector);

    this.palette.className = "webGraffiti__editor_palette";
    this.palette.addEventListener("scroll", (e) => {
      this.state.palettePosition = this.palette.scrollLeft;
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(() => {
        this.save();
      }, 100);
      e.preventDefault();
    });
    this.paletteContainer.append(this.palette);
    this.containerInner.append(this.paletteContainer);

    this.container.append(this.containerInner);
    this.wg.rootElement.append(this.container);

    this.handle.className = "webGraffiti__editor_handle";
    this.containerInner.append(this.handle);
    this.setupColors();
    this.setupPaintMeter();
    this.setupBrushTool();
    this.selectColor(this.state.selected);
    this.updatePaintMeter();

    if (this.state.brushSize) {
      console.log("restore brushsize", this.state.brushSize);
      this.setBrushSize(this.state.brushSize);
      this.brushSlider.setAttribute("value", String(this.state.brushSize));
    }

    this.palette.scrollLeft = this.state.palettePosition;
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

  async handlePaletteChange(
    event: HTMLElementEvent<HTMLSelectElement>
  ): Promise<void> {
    const paletteId = parseInt(event.target.value);
    const palettes = await this.wg.config.getPalettes();
    const palette = palettes.find((p) => p.id === paletteId);
    if (!palette) {
      return;
    }

    this.palette.innerHTML = "";
    this.state.colors = palette.colors;
    this.state.selected = 0;
    this.state.palettePosition = 0;
    this.setupColors();
  }

  setupColors(): void {
    this.palette.innerHTML = "";
    this.state.colors.forEach((color, index) => {
      this.palette.append(this.setupButton(color, index));
    });
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
    this.state.colors[index] = color;
    this.buttons[index].style.backgroundColor = color;
    this.buttons[index].setAttribute("data-color", color);
    this.selectColor(index);
  }

  selectColor(index: number) {
    this.state.selected = index;
    this.wg.client.setColor(this.state.colors[index]);
    document.querySelectorAll(".webGraffiti__color").forEach((button) => {
      if (parseInt(button.getAttribute("data-index") || "") === index) {
        button.classList.add("webGraffiti__color--active");
      } else {
        button.classList.remove("webGraffiti__color--active");
      }
    });
    this.updateBrushPreview();
    this.paintRemaining.style.backgroundColor =
      this.state.colors[this.state.selected];
    this.save();
  }

  setBrushSize(size: number) {
    console.log("setBrushSize", size);
    this.state.brushSize = size;
    this.wg.client.setLineWidth(size);
    this.updateBrushPreview();
    this.save();
  }

  updateBrushPreview() {
    this.brushPreview.style.backgroundColor =
      this.state.colors[this.state.selected];
    this.brushPreview.style.width = `${this.wg.client.ctx.lineWidth}px`;
    this.brushPreview.style.height = `${this.wg.client.ctx.lineWidth}px`;
  }

  updatePaintMeter() {
    const height =
      (this.wg.client.paint / this.wg.config.channel.paintVolume) * 100;
    this.paintRemaining.style.height = `${height}%`;
  }

  hideAllColorPickers() {
    this.buttons.forEach((button) => {});
  }

  restore(): void {
    const storageState = localStorage.getItem(STORAGE_KEY_EDITOR_STATE);
    if (storageState) {
      const state = JSON.parse(storageState) as EditorState;
      if (state.colors) {
        this.state.colors = state.colors;
      }

      if (state.selected) {
        this.state.selected = state.selected;
      }

      if (state.palettePosition) {
        this.state.palettePosition = state.palettePosition;
      }

      if (state.brushSize) {
        this.state.brushSize = state.brushSize;
      }
    }
  }

  save(): void {
    localStorage.setItem(STORAGE_KEY_EDITOR_STATE, JSON.stringify(this.state));
  }

  reset() {
    this.state = {
      selected: 0,
      colors: [],
      palettePosition: 0,
      brushSize: 0,
    };
    this.save();
    this.init();
  }
}
