import config from './config.js';

export default class webGraffiti {

    constructor() {
        console.log('webGraffiti initializing...');
        this.config = new config(this);
        this.mouse = {x: 0, y: 0};
        this.mouseDown = false;
        this.chunkSize = 16;
        this.chunkMap = [];
        this.pixelMap = [];
        this.name = '';
    }

    init(canvasId) {
        console.log('init');
        this.canvasId = canvasId;
        this.canvas = document.getElementById(this.canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineWidth = 1;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
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

    loadImage() {
        return new Promise(resolve => {
            this.image = new Image();
            this.image.src = this.config.imageName;
            this.image.onload = () => {
                resolve();
            }
        });
    }

    load() {
        console.log('load');
        return new Promise(resolve => {
          this.config
            .load()
            .then(() => {
                return this.loadImage();
            })
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
            this.ctx.drawImage(this.image, 0, 0);
          });
      }

      updateMouse(e) {
        this.mouse.x = e.pageX - this.canvas.offsetLeft;
        this.mouse.y = e.pageY - this.canvas.offsetTop;
      }

      paint() {
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
        //console.log(this.getChunk(this.mouse.x, this.mouse.y));
        //this.sendMessage({event: 'paint', x: this.mouse.x, y: this.mouse.y});
      }

      setColor(color) {
        this.ctx.strokeStyle = color;
      }

      getChunk(x, y) {
        return `${Math.floor((x-1)/this.chunkSize)}x${Math.floor((y-1)/this.chunkSize)}`;
      }

      getChunkHash(cx, cy) {
          let chars = "";
          for (let x = cx; x < cx+this.chunkSize; x++) {
              for (let y = cy; y < cy+this.chunkSize; y++) {
                chars += this.getPixel(x, y);
              }
          }
          return SparkMD5.hash(chars);
      }

      getPixel(x, y) {
        return this.ctx.getImageData(x, y, 1, 1).data.join("");
      }

      sendMessage(message) {
        console.log(message);
        //this.ws.send(JSON.stringify(message));
      }

}