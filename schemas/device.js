//use mongoose to create a model for the database
const mongoose = require('mongoose');

//create a model via a Schema
const deviceSchema = new mongoose.Schema({
    DeviceName: {
        type: String,
        maxLength: 255,
        require: true,
    },
    DeviceType: {
        type: String,
        require: true,
        maxLength: 100,
    },
    DeviceIdentifier: {
        type: String,
        require: true,
    },
});

module.exports = deviceSchema;