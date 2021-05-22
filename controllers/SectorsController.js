var Sector = require('./entities/Sector');

var types = ['road', 'storage'];

module.exports = class SectorsController {
    constructor() {
        this.sectors = new Map;
    }

    addSector(id, type, size, predictor) {
        if(!types.includes(type)) {
            throw new Error(`Bad type ${type}, ${location}`);
        }

        let sector = new Sector(id, type, size, predictor);
        this.sectors[id] = sector;
    }
}