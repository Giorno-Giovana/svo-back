var Notify = require("./entities/Notify");
var i = 0;

module.exports = class NotifyController {
    constructor() {
        this.notifies = new Map;
    }

    addNotify(sectorId, volume, location)
    {
        let id = ++i;
        let notify = new Notify(id, sectorId, volume, location);
        this.notifies[id] = notify;
    }

    removeNotify(id) {
        this.notifies.delete(id);
    }
}