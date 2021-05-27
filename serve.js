const express = require('express');
const path = require('path');
const webSocketServer = require('websocket').server;
const http = require('http');



console.log("Starting WebGraffiti...");

// web server

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.listen(config.webPort, function() {
  console.log(`Web server listening on port ${config.webPort}`);
});


// web socket

const config = {
    webSocketPort: 8666
};

const clients = [];
const httpServer = http.createServer();
const wsServer = new webSocketServer({
    httpServer
});

wsServer.on('request', function(request) {
    console.log(
      `${new Date().toTimeString()} : new connection from ${request.remoteAddress}`
    );
  
    const connection = request.accept(null, request.origin);
    const client = {
      index: clients.length,
      connection,
      ip: request.remoteAddress,
      join: Math.round(new Date().getTime() / 1000)
    };
    clients.push(client);

    connection.on('message', function(message) {
      if (message.type === 'utf8') {
        const json = JSON.parse(message.utf8Data);
      }
    });
  
    connection.on('close', function() {
      console.log(`Client ${client.index} disconnected`);
    });
  });

httpServer.listen(config.webSocketPort, function() {
    console.log(`WebSocket server is listening on port ${config.webSocketPort}`);
  });
  