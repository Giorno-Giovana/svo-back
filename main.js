var SocketServer = require("./SocketServer");
var WorkersController = require("./controllers/WorkersController");
var TasksController = require("./controllers/TasksController");
const TasksController = require("./controllers/TasksController");

var workersController = new WorkersController();
var tasksController = new TasksController();
var server = new SocketServer({port: 3257});

server.onMessage = (connect, data) => {
    let methods = {
        'makeWorker': () => {
            let {type, location} = data['makeWorker'];
            workersController.addWorker(type, location);
        },
        'addTask': () => {
            let {deadline, sector, location, workers} = data['addTask'];
            tasksController.addTask(deadline, sector, location, workers);
            server.send({tasks: tasksController.tasks});
        },
    };
    methods[data.method]();
}

setInterval(() => server.send({workers: workersController.workers}), 1000);

for (let {type, position} of require("./data/workers.json"))
    workersController.addWorker(type, position);