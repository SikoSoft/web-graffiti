export default class editor {
  constructor(wg) {
    this.wg = wg;
    this.selected = 0;
  }

  init() {
    this.colors = [...this.wg.config.defaultColors];
    this.container = document.createElement('div');
    this.container.className = 'webGraffiti__editor';
    this.wg.rootElement.append(this.container);
    this.colors.forEach((color, index) => {
      this.container.append(this.setupButton(color, index));
    });
    this.selectColor(0);
  }

  setupButton(buttonColor, index) {
    const button = document.createElement('button');
    button.className = 'webGraffiti__color';
    button.setAttribute('data-color', buttonColor);
    button.setAttribute('data-index', index);
    button.style.backgroundColor = buttonColor;
    new window.Picker({
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
    return button;
  }

  selectColor(index) {
    this.selected = index;
    this.wg.render.setColor(this.colors[index]);
    document.querySelectorAll('.webGraffiti__color').forEach((button) => {
      if (parseInt(button.getAttribute('data-index')) === index) {
        button.classList.add('webGraffiti__color--active');
      } else {
        button.classList.remove('webGraffiti__color--active');
      }
    });
  }
}
