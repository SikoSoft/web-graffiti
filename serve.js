/* eslint no-console: 0 */
const { v4 } = require('uuid');
const express = require('express');
const path = require('path');
const fs = require('fs');
const config = require('./config.json');
const webSocketServer = require('websocket').server;
const http = require('http');
const { createCanvas, loadImage } = require('canvas');
const SparkMD5 = require('spark-md5');

console.log('Starting WebGraffiti...');

let lastHash = '';
const clients = [];

const canvas = createCanvas(config.width, config.height);
const ctx = canvas.getContext('2d');

loadImage(`public/${config.imageName}`).then((image) => {
  ctx.drawImage(image, 0, 0);
  lastHash = SparkMD5.hash(canvas.toBuffer('image/png'));
});

const saveImage = (buffer, hash) => {
  lastHash = hash;
  fs.writeFileSync(`public/${config.imageName}`, buffer);
};

const syncImage = () => {
  const buffer = canvas.toBuffer('image/png');
  const hash = SparkMD5.hash(buffer);
  if (hash !== lastHash) {
    saveImage(buffer, hash);
  }
};

const broadcast = (message, ignoreClientId = '') => {
  clients
    .filter((client) => !ignoreClientId || client.id !== ignoreClientId)
    .forEach((client) => {
      client.connection.sendUTF(JSON.stringify(message));
    });
};

// web server

const router = express.Router();
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

router.get('/config.json', (req, res) => {
  fs.readFile('./config.json', (error, data) => {
    res.send(data);
  });
});
app.use(router);

app.listen(config.webPort, function () {
  console.log(`Web server listening on port ${config.webPort}`);
});

// web socket

const httpServer = http.createServer();
const wsServer = new webSocketServer({
  httpServer,
});

wsServer.on('request', function (request) {
  const id = v4();

  const connection = request.accept(null, request.origin);
  const client = {
    id,
    index: clients.length,
    connection,
    ip: request.remoteAddress,
    join: Math.round(new Date().getTime() / 1000),
    ctx: {},
  };
  clients.push(client);
  connection.client = client;

  console.log(
    `${new Date().toTimeString()} : new connection from ${
      request.remoteAddress
    } (${id})`
  );

  connection.sendUTF(
    JSON.stringify({
      event: 'welcome',
      id,
    })
  );

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      const json = JSON.parse(message.utf8Data);
      console.log(json);
      switch (json.event) {
        case 'setContext':
          connection.client.ctx = json.ctx;
          for (const key in json.ctx) {
            ctx[key] = json.ctx[key];
          }
          break;
        case 'beginPath':
          ctx.beginPath();
          break;
        case 'paint':
          ctx.lineTo(json.x, json.y);
          ctx.stroke();
          const pixelData = ctx.getImageData(json.x, json.y, 1, 1);
          broadcast(
            {
              event: 'pixel',
              x: json.x,
              y: json.y,
              r: pixelData.data[0],
              g: pixelData.data[1],
              b: pixelData.data[2],
              a: pixelData.data[3],
            },
            connection.client.id
          );
          break;
      }
    }
  });

  connection.on('close', function () {
    console.log(`Client ${client.index} disconnected`);
    syncImage();
  });
});

httpServer.listen(config.webSocketPort, function () {
  console.log(`WebSocket server is listening on port ${config.webSocketPort}`);
});

setInterval(syncImage, config.autoSave);
