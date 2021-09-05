//use mongoose to create a model for the database
const mongoose = require('mongoose');
const mongooseSchemaSpeedTest = require('../schemas/speedtest');

//create a model via a Schema
const networkMonitorSchema = new mongoose.Schema({
    UserId: {
        type: String,
        require: true,
    },
    DeviceId: {
        type: String,
        require: true,
    },
    LogDate: {
        type: Date,
    },
    LogType: {
        type: String,
        enum: ['SpeedTest'],
        require: true,
    },
    SpeedTest: {
        type: [mongooseSchemaSpeedTest],
    },
});

module.exports = networkMonitorSchema;