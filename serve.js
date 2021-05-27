const webSocketServer = require('websocket').server;
const http = require('http');


console.log("Starting WebGraffiti server...");

const config = {
    webSocketPort: 66
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
  