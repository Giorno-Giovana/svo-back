var SocketServer = require("./SocketServer");

server = new SocketServer({port: 3257});

setInterval(() => server.send(`['string', ${Math.random()}]`), 1000);