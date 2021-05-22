const SocketServer = require("./SocketServer");
const WorkersController = require("./controllers/WorkersController");
const TasksController = require("./controllers/TasksController");
const SectorsController = require("./controllers/SectorsController");
const NotifyController = require("./controllers/NotifyController");
const predictor = require("./shared/predictor");

var workersController = new WorkersController();
var tasksController = new TasksController();
var sectorsController = new SectorsController();
var notifyController = new NotifyController();

var server = new SocketServer({port: 3257});

for (let {type, position} of require("./data/workers.json"))
    workersController.addWorker(type, position);

for (let {id, type, width, height} of require("./data/sectors.json"))
    sectorsController.addSector(id, type, [width, height], require("./shared/predictor"));

server.onMessage = (connect, data) => {
    let methods = {
        'makeWorker': () => {
            let {type, location} = data['makeWorker'];
            workersController.addWorker(type, location);
        },
        'addTask': () => {
            let {id, sector, location, workers} = data['addTask'];
            tasksController.addTask(sector, location, workers);
            server.send({tasks: tasksController.tasks});
        },
        'claim': () => {
            let {id, status, volume, location} = data['claim'];
            sectorsController.sectors[id].status = volume;
            if (status == 2) {
                notifyController.addNotify(id, volume, location);
                server.send({notify: notifyController.notifies})
            }
            server.send({sectors: sectorsController.sectors});
        }
    };
    methods[data.method]();
}

setInterval(() => server.send({workers: workersController.workers, sectors: sectorsController.sectors}), 1000);
