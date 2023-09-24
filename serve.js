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

// initialization, callbacks & handlers

let lastHash = "";
const clients = [];

const canvas = createCanvas(config.width, config.height);
const ctx = canvas.getContext("2d");

ctx.lineWidth = 100;

const load = () => {
  loadImage(`public/${config.imageName}`)
    .then((image) => {
      ctx.drawImage(image, 0, 0);
      lastHash = SparkMD5.hash(canvas.toBuffer("image/png"));
      console.log("Initialized image context");
    })
    .catch((error) => {
      console.log("Error opening image");
      restore();
    });
};

const restore = () => {
  fs.copyFile(`public/new-wall.png`, `public/${config.imageName}`, (error) => {
    if (error) {
      console.log("There was a problem restoring the wall");
    } else {
      console.log("Wall was missing, but has been restored");
      load();
    }
  });
};

const save = (buffer, hash) => {
  lastHash = hash;
  fs.writeFileSync(`public/${config.imageName}`, buffer);
};

const sync = () => {
  const buffer = canvas.toBuffer("image/png");
  const hash = SparkMD5.hash(buffer);
  if (hash !== lastHash) {
    save(buffer, hash);
  }
};

const broadcast = (message, ignoreClientId = "") => {
  clients
    .filter((client) => !ignoreClientId || client.id !== ignoreClientId)
    .forEach((client) => {
      client.connection.sendUTF(JSON.stringify(message));
    });
};

// prepare the image

load();

// web server

const router = express.Router();
const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.static(path.join(__dirname, "/dist")));

router.get("/config.json", (req, res) => {
  fs.readFile("./config.json", (error, data) => {
    const { server, ...config } = JSON.parse(data);
    res.send(JSON.stringify(config));
  });
});
app.use(router);

const secureConfig = config.server.secure
  ? {
      key: fs.readFileSync(config.server.secureKey),
      cert: fs.readFileSync(config.server.secureCert),
    }
  : {};

(config.server.secure ? https : http)
  .createServer(secureConfig, app)
  .listen(config.server.webPort, () => {
    // eslint-disable-next-line
    console.log(`Web server listening on port ${config.server.webPort}`);
  });

// web socket

const httpServer = config.server.secure
  ? https.createServer(secureConfig)
  : http.createServer();
const wsServer = new webSocketServer({
  httpServer,
});

wsServer.on("request", function (request) {
  const id = v4();

  const connection = request.accept(null, request.origin);
  const joinTime = Math.round(new Date().getTime());
  const client = {
    id,
    index: clients.length,
    connection,
    ip: request.remoteAddress,
    join: joinTime,
    paint: config.paintVolume,
    role: 0,
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
      width: config.width,
      height: config.height,
      paint: connection.client.paint,
      join: connection.client.join,
    })
  );

  clients
    .filter((client) => client.id !== id)
    .forEach((client) => {
      connection.sendUTF(
        JSON.stringify({
          event: "newClient",
          id: client.id,
          ctx: client.ctx,
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
          for (const key in connection.client.ctx) {
            ctx[key] = connection.client.ctx[key];
          }
          let paintUsed;
          if (hasInfinitePaint(connection.client)) {
            paintUsed = 0;
          } else {
            paintUsed = ctx.lineWidth * Math.PI;
          }

          let newVolume = connection.client.paint - paintUsed;
          let exceeded = false;
          if (newVolume < 0) {
            newVolume = 0;
            exceeded = true;
          }
          if (!exceeded) {
            connection.client.paint = newVolume;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
            connection.sendUTF(
              JSON.stringify({
                event: "paint",
                paint: newVolume,
              })
            );
            broadcast(
              {
                event: "line",
                id,
                line: json.line,
              },
              id
            );
          }
          break;
        }
        case "role":
          console.log("role json", json);
          connection.client.role = json.newRole;
        case "refill":
          connection.client.paint = config.paintVolume;
          connection.sendUTF(
            JSON.stringify({ event: "paint", paint: config.paintVolume })
          );
          break;
      }
    }
  });

  connection.on("close", function () {
    console.log(`Client ${client.index} disconnected`);
    clients.splice(clients.indexOf(client), 1);
    sync();
  });
});

httpServer.listen(config.server.webSocketPort, function () {
  console.log(
    `WebSocket server is listening on port ${config.server.webSocketPort}`
  );
});

function hasInfinitePaint(client) {
  console.log("hasInfinitePaint", client);
  const hasInfinitePaint = getPaintFromRole(client.role);
  console.log("hasInfinitePaint", hasInfinitePaint);
  return hasInfinitePaint;
}

function getPaintFromRole(role) {
  console.log("getPaintFromRole", role);
  return config.roles.find((r) => r.id == parseInt(role)).infinitePaint;
}

setInterval(sync, config.server.autoSave);

const paintPerTick =
  (config.server.paintRefill / config.paintTime) * config.paintVolume;
setInterval(() => {
  clients.forEach((client) => {
    if (client.paint < config.paintVolume) {
      const newPaint =
        client.paint + paintPerTick < config.paintVolume
          ? client.paint + paintPerTick
          : config.paintVolume;
      client.paint = newPaint;
      client.connection.sendUTF(
        JSON.stringify({ event: "paint", paint: client.paint })
      );
    }
  });
}, config.server.paintRefill);
