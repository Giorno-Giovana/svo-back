module.exports = class Worker {
    constructor(id, type, location) {
        this.id = id;
        this.type = type;
        this.location = location;
        this.resourses = new Map;
        this.resourses['fuel'] = 100;
        this.status_ = {value: 0, tasks:[]};
    }

    set status(status) {
        this.status_.value = status;
    }

    addTask(task) {
        this.status_.tasks.push(task);
    }

    compliteTask() {
        this.status_.tasks.shift();
    }
}