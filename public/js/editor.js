export default class editor {
  constructor(wg) {
    this.wg = wg;
    this.selected = 0;
    this.disabled = false;
  }

  init() {
    this.colors = [...this.wg.config.defaultColors];
    this.container = document.createElement("div");
    this.container.className = "webGraffiti__editor";
    this.containerInner = document.createElement("div");
    this.containerInner.className = "webGraffiti__editor_inner";
    this.container.append(this.containerInner);
    this.wg.rootElement.append(this.container);
    this.handle = document.createElement("div");
    this.handle.className = "webGraffiti__editor_handle";
    this.containerInner.append(this.handle);
    this.colors.forEach((color, index) => {
      this.containerInner.append(this.setupButton(color, index));
    });
    this.setupBrushTool();
    this.selectColor(0);
  }

  setupBrushTool() {
    this.brushTool = document.createElement("div");
    this.brushTool.className = "webGraffiti__editor_brush";
    this.brushToolInner = document.createElement("div");
    this.brushToolInner.className = "webGraffiti__editor_brush_inner";
    this.brushTool.append(this.brushToolInner);
    this.brushPreview = document.createElement("div");
    this.brushPreview.className = "webGraffiti__editor_brush_preview";
    this.brushToolInner.append(this.brushPreview);
    this.brushSlider = document.createElement("input");
    this.brushSlider.className = "webGraffiti_editor_brush_slider";
    this.brushSlider.setAttribute("type", "range");
    this.brushSlider.setAttribute("orient", "vertical");
    this.brushSlider.setAttribute("min", this.wg.config.minBrushSize);
    this.brushSlider.setAttribute("max", this.wg.config.maxBrushSize);
    this.brushSlider.setAttribute("value", this.wg.config.defBrushSize);
    this.brushSlider.addEventListener("input", (e) => {
      this.setBrushSize(e.target.value);
    });
    this.brushToolInner.append(this.brushSlider);
    this.containerInner.append(this.brushTool);
  }

  setupButton(buttonColor, index) {
    const button = document.createElement("button");
    button.className = "webGraffiti__color";
    button.setAttribute("data-color", buttonColor);
    button.setAttribute("data-index", index);
    button.style.backgroundColor = buttonColor;
    if (window.Picker) {
      const picker = new window.Picker({
        color: buttonColor,
        parent: button,
        alpha: false,
        editor: false,
        popup: "top",
        onDone: (color) => {
          button.setAttribute("data-color", color.hex);
          button.style.backgroundColor = color.hex;
          this.colors[index] = color.hex;
          this.selectColor(index);
        },
      });
      picker.openHandler = () => {
        this.selectColor(index);
        if (this.wg.input.doubleClick) {
          picker.show();
        }
      };
    }
    button.addEventListener("touchstart", () => {
      this.selectColor(index);
    });
    return button;
  }

  selectColor(index) {
    this.selected = index;
    this.wg.client.setColor(this.colors[index]);
    document.querySelectorAll(".webGraffiti__color").forEach((button) => {
      if (parseInt(button.getAttribute("data-index")) === index) {
        button.classList.add("webGraffiti__color--active");
      } else {
        button.classList.remove("webGraffiti__color--active");
      }
    });
    this.updateBrushPreview();
  }

  setBrushSize(size) {
    this.wg.client.setLineWidth(size);
    this.updateBrushPreview();
  }

  disable() {
    this.disabled = true;
  }

  updateBrushPreview() {
    this.brushPreview.style.backgroundColor = this.colors[this.selected];
    this.brushPreview.style.width = `${this.wg.client.ctx.lineWidth}px`;
    this.brushPreview.style.height = `${this.wg.client.ctx.lineWidth}px`;
  }
}
