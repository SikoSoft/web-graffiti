import config from './config.js';

export default class webGraffiti {

    constructor() {
        console.log('webGraffiti initializing...');
        this.config = new config(this);
        this.mouse = {x: 0, y: 0};
        this.mouseDown = false;
    }

    init(canvasId) {
        console.log('init');
        this.canvasId = canvasId;
        this.canvas = document.getElementById(this.canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineWidth = 1;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#00CC99';
        this.canvas.addEventListener('mousedown', (e) => {
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouse.x, this.mouse.y);
            this.mouseDown = true;
            this.updateMouse(e);
            this.ctx.beginPath();
            this.ctx.moveTo(this.mouse.x, this.mouse.y);
            this.paint();
        }, false);
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.mouseDown) {
                this.updateMouse(e);
                this.paint();
            }
        });
        document.addEventListener('mouseup', () => {
            this.mouseDown = false;
        }, false);
        this.ws = new WebSocket(this.config.mpServer);
        this.run();
    }

    load() {
        console.log('load');
        return new Promise(resolve => {
          this.config
            .load()
            .then(() => {
              resolve();
            })
            .catch(error => {
              console.log('Encountered an error while loading!', error);
            });
        });
      }

      run() {
          console.log('run');
          this.load().then(() => {
            console.log('running');
          });
      }

      updateMouse(e) {
        this.mouse.x = e.pageX - this.canvas.offsetLeft;
        this.mouse.y = e.pageY - this.canvas.offsetTop;
      }

      paint() {
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
      }

      sendMessage() {

      }

}