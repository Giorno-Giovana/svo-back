var Task = require('./entities/Task');

var i = 0;

module.exports = class TasksController {
    constructor() {
        this.tasks = new Map;
    }

    addTask(deadline, sector, location, workers) {
        let id = ++i;
        let task = new Task(id, deadline, sector, location, workers);

        this.tasks[id] = task;
    }
}