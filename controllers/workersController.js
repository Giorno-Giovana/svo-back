var Worker = require('./entities/Worker');

var i = 0;
var types = ['truck', 'scout', 'brush', 'reagentBrush', 'excavator', 'loader'];

module.exports = class WorkersController {
    constructor() {
        this.additional = {
            'truck': function () {
                this.resourses['freeAmount'] = 100;
            },
            'reagentBrush': function () {
                this.resourses['reagent'] = 100;
            }
        }
        this.workers = new Map;
    }

    addWorker(type, location) {
        if(!types.includes(type)) {
            throw new Error(`Bad type ${type}, ${location}`);
        }

        let id = ++i;
        let worker = new Worker(id, type, location);

        if(type in this.additional){
            this.additional[type].call(worker);
        }

        this.workers[id] = worker;
    }
}