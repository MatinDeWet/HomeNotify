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
    DeviceIPv4: {
        type: String,
        require: true,
        minLength: 15,
        maxLength: 15,
    },
    DeviceMacAddress: {
        type: String,
        require: true,
        minLength: 17,
        maxLength: 17,
    },
});

module.exports = deviceSchema;