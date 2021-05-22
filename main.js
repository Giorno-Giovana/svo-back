var SocketServer = require("./SocketServer");
var WorkersController = require("./controllers/workersController")

var workersController = new WorkersController();
var server = new SocketServer({port: 3257});

setInterval(() => server.send(workersController.workers), 1000);

for (let {type, position} of require("./data/workers.json"))
    workersController.addWorker(type, position);