module.exports = class Task {
    constructor(id, sector, location, workers) {
        this.id = id;
        this.status = 0;
        this.time = Date;
        this.sector = sector;
        this.location = location;
        this.workers = workers;
    }

    nextStatus() {
        if (this.status > 1) return false;
        this.status += 1;
        return true;
    }
}