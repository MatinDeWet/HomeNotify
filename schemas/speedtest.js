//use mongoose to create a model for the database
const mongoose = require('mongoose');

//create a model via a Schema
const speedTestSchema = new mongoose.Schema({
    TestTime: {
        type: Date,
        default: Date.now,
    },
    Ping: {
        type: Number,
        require: true,
    },
    Download: {
        type: Number,
        require: true,
    },
    Upload: {
        type: Number,
        require: true,
    },
});

module.exports = speedTestSchema;