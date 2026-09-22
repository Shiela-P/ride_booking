const mongoose = require('../db/session');

const RideSchema = new mongoose.Schema({
    name : String,
    description: String,
    times: [String],
    isActive: Boolean
})

const Ride = mongoose.model('Ride', RideSchema);

module.exports = Ride;