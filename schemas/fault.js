//use mongoose to create a model for the database
const mongoose = require('mongoose');

//create a model via a Schema
const faultSchema = new mongoose.Schema({
    FaultDateTime: {
        type: Date,
        default: Date.now(),
    },
    FaultRegion: {
        type: String,
        require: true,
    },
    FaultAction: {
        type: String,
        require: true,
    },
});

module.exports = faultSchema;