var WebSocketServer = new require('ws');

module.exports = class SocketServer {
    constructor(config) {
        this.webSocket = new WebSocketServer.Server(config);
        this.onMessageHandler = function(connect) {
            return function(message) {
                console.log(message);
                connect.send('<OK>');
            }
        }
        var server = this;
        this.webSocket.on('connection', function(connect) {
            var id = Math.random();
            console.log('<Новое соединение ' + id + '>');
            connect.on('message', server.onMessageHandler(connect));
            connect.on('close', function() {
              console.log('<Соединение закрыто ' + id + '>');
            });
        });
    }
    
    set onMessage(handler) {
        this.onMessageHandler = handler;
    }

    send(message) {
        for (var connect of this.webSocket.clients) {
            connect.send(message);
        }
    }
};