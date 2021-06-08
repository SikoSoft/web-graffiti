export default class editor {
  constructor(wg) {
    this.wg = wg;
    this.selected = 0;
    this.disabled = false;
  }

  init() {
    this.colors = [...this.wg.config.defaultColors];
    this.container = document.createElement('div');
    this.container.className = 'webGraffiti__editor';
    this.containerInner = document.createElement('div');
    this.containerInner.className = 'webGraffiti__editor_inner';
    this.container.append(this.containerInner);
    this.wg.rootElement.append(this.container);
    this.handle = document.createElement('div');
    this.handle.className = 'webGraffiti__editor_handle';
    this.containerInner.append(this.handle);
    this.colors.forEach((color, index) => {
      this.containerInner.append(this.setupButton(color, index));
    });
    this.selectColor(0);
  }

  setupButton(buttonColor, index) {
    const button = document.createElement('button');
    button.className = 'webGraffiti__color';
    button.setAttribute('data-color', buttonColor);
    button.setAttribute('data-index', index);
    button.style.backgroundColor = buttonColor;
    const picker = new window.Picker({
      color: buttonColor,
      parent: button,
      alpha: false,
      editor: false,
      popup: 'top',
      onDone: (color) => {
        button.setAttribute('data-color', color.hex);
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
    button.addEventListener('touchstart', () => {
      this.selectColor(index);
    });
    return button;
  }

  selectColor(index) {
    this.selected = index;
    this.wg.client.setColor(this.colors[index]);
    document.querySelectorAll('.webGraffiti__color').forEach((button) => {
      if (parseInt(button.getAttribute('data-index')) === index) {
        button.classList.add('webGraffiti__color--active');
      } else {
        button.classList.remove('webGraffiti__color--active');
      }
    });
  }

  disable() {
    this.disabled = true;
  }
}
