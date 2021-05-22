var SocketServer = require("./SocketServer");
var WorkersController = require("./controllers/workersController")

var workersController = new WorkersController();
var server = new SocketServer({port: 3257});

server.onMessage = (connect, data) => {
    if ('makeWorker' in data) {
        let {type, location} = data['makeWorker'];
        workersController.addWorker(type, location);
    }
}

setInterval(() => server.send({workers: workersController.workers}), 1000);

for (let {type, position} of require("./data/workers.json"))
    workersController.addWorker(type, position);