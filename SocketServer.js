var WebSocketServer = new require('ws');

module.exports = class SocketServer {
    constructor(config) {
        this.webSocket = new WebSocketServer.Server(config);
        this.onMessageHandler = function(connect, data) {
            console.log(data);
            connect.sendResponce({status: 200});
        }
        var server = this;
        this.webSocket.on('connection', function(connect) {
            var id = Math.random();
            console.log('<Новое соединение ' + id + '>');
            connect.on('message', function(message) {
                connect.sendResponce = function(data) {
                    let message = JSON.stringify(data);
                    this.send(message);
                }
                server.onMessageHandler(connect, JSON.parse(message));
            });
            connect.on('close', function() {
              console.log('<Соединение закрыто ' + id + '>');
            });
        });
    }
    
    set onMessage(handler) {
        this.onMessageHandler = handler;
    }

    send(data) {
        let message = JSON.stringify(data);
        for (var connect of this.webSocket.clients) {
            connect.send(message);
        }
    }
};