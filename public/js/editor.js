export default class editor {
  constructor(wg) {
    this.wg = wg;
    this.selected = 0;
  }

  init() {
    this.container = document.querySelector('#webGraffiti-editor');
    this.wg.config.defaultColors.forEach((color, index) => {
      this.container.append(this.setupButton(color, index));
    });
    this.syncSelected();
  }

  setupButton(defaultColor, index) {
    const button = document.createElement('button');
    button.className = 'webGraffiti__color';
    button.setAttribute('data-color', defaultColor);
    button.setAttribute('data-index', index);
    button.style.backgroundColor = defaultColor;
    new window.Picker({
      color: defaultColor,
      parent: button,
      alpha: false,
      editor: false,
      popup: 'top',
      onDone: (color) => {
        button.setAttribute('data-color', color.hex);
        button.style.backgroundColor = color.hex;
        this.selected = index;
        this.wg.setColor(color.hex);
        this.syncSelected();
      },
    });
    return button;
  }

  syncSelected() {
    document.querySelectorAll('.webGraffiti__color').forEach((button) => {
      if (parseInt(button.getAttribute('data-index')) === this.selected) {
        button.classList.add('webGraffiti__color--active');
      } else {
        button.classList.remove('webGraffiti__color--active');
      }
    });
  }
}
