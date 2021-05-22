module.exports = class Task {
    constructor(id, deadline, sector, location, workers) {
        this.id = id;
        this.status = 0;
        this.time = { start: new Date, deadline: deadline};
        this.sector = sector;
        this.cost = sector.cost();
        this.location = location;
        this.workers = workers;
    }

    nextStatus() {
        if (this.status > 1) return false;
        this.status += 1;
        return true;
    }
}