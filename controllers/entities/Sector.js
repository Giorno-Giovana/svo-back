module.exports = class Sector {
    constructor(id, type, size, predictor) {
        this.id = id;
        this.type = type;
        this.size = size;
        this.peredictor = predictor;
        this.status_ = 0;
    }

    set status(status) {
        this.status_.value = status;
        this.status_.time = new Date;
    }

    update() {
        this.status_.expected = predictor.call(this.status_);
    }

    get cost() {
        let result = 1;
        for (let value of this.size) {
            result *= value;
        }
        return value * predictor.call(this.status_).value / 1000;
    }
}