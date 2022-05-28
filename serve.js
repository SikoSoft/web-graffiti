/* eslint no-console: 0, no-magic-numbers: 0 */
const { v4 } = require("uuid");
const express = require("express");
const path = require("path");
const fs = require("fs");
const config = require("./config.json");
const webSocketServer = require("websocket").server;
const http = require("http");
const https = require("https");
const { createCanvas, loadImage } = require("canvas");
const SparkMD5 = require("spark-md5");

console.log("Starting WebGraffiti...");

let lastHash = "";
const clients = [];

const canvas = createCanvas(config.width, config.height);
const ctx = canvas.getContext("2d");

ctx.lineWidth = 100;

loadImage(`public/${config.imageName}`).then((image) => {
  ctx.drawImage(image, 0, 0);
  lastHash = SparkMD5.hash(canvas.toBuffer("image/png"));
});

const saveImage = (buffer, hash) => {
  lastHash = hash;
  fs.writeFileSync(`public/${config.imageName}`, buffer);
};

const syncImage = () => {
  const buffer = canvas.toBuffer("image/png");
  const hash = SparkMD5.hash(buffer);
  if (hash !== lastHash) {
    saveImage(buffer, hash);
  }
};

const broadcast = (message, ignoreClientId = "") => {
  clients
    .filter((client) => !ignoreClientId || client.id !== ignoreClientId)
    .forEach((client) => {
      client.connection.sendUTF(JSON.stringify(message));
    });
};

// web server

const router = express.Router();
const app = express();

app.use(express.static(path.join(__dirname, "/public")));

router.get("/config.json", (req, res) => {
  fs.readFile("./config.json", (error, data) => {
    const { server, ...config } = JSON.parse(data);
    res.send(JSON.stringify(config));
  });
});
app.use(router);

const secureConfig = config.secure
  ? {
      key: fs.readFileSync(config.secureKey),
      cert: fs.readFileSync(config.secureCert),
    }
  : {};

(config.secure ? https : http)
  .createServer(secureConfig, app)
  .listen(config.server.webPort, () => {
    // eslint-disable-next-line
    console.log(`Web server listening on port ${config.server.webPort}`);
  });

// web socket

const httpServer = http.createServer();
const wsServer = new webSocketServer({
  httpServer,
});

wsServer.on("request", function (request) {
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
      event: "welcome",
      id,
    })
  );

  clients
    .filter((client) => client.id !== id)
    .forEach((client) => {
      connection.sendUTF(
        JSON.stringify({
          event: "newClient",
          id: client.id,
        })
      );
    });

  broadcast(
    {
      event: "newClient",
      id,
    },
    id
  );

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      const json = JSON.parse(message.utf8Data);
      console.log(json);
      switch (json.event) {
        case "setContext": {
          connection.client.ctx = json.ctx;
          for (const key in json.ctx) {
            ctx[key] = json.ctx[key];
          }
          broadcast(
            {
              event: "setContext",
              id,
              ctx: json.ctx,
            },
            id
          );
          break;
        }
        case "line": {
          const [x1, y1, x2, y2] = json.line;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.closePath();
          broadcast(
            {
              event: "line",
              id,
              line: json.line,
            },
            id
          );
          break;
        }
      }
    }
  });

  connection.on("close", function () {
    console.log(`Client ${client.index} disconnected`);
    clients.splice(clients.indexOf(client), 1);
    syncImage();
  });
});

httpServer.listen(config.server.webSocketPort, function () {
  console.log(
    `WebSocket server is listening on port ${config.server.webSocketPort}`
  );
});

setInterval(syncImage, config.server.autoSave);
