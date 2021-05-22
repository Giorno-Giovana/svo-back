const Weather = require("./Weather")

const volume = Weather.get();
console.log(`<Осадки составляют: ${volume}`);

module.exports = function() {
    return this.value + (+new Date - +this.time) * (volume / (24 * 3600))
} 