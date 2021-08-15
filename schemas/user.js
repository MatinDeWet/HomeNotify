//use mongoose to create a model for the database
const mongoose = require('mongoose');
const mongooseSchemaApiKey = require('../schemas/apikey');
const mongooseSchemaDevice = require('../schemas/device');

//create a model via a Schema
const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        maxLength: 255,
        require: true,
    },
    Email: {
        type: String,
        require: true,
        maxLength: 255,
    },
    Password: {
        type: String,
        require: true,
        maxLength: 255,
    },
    APIKey: {
        type: mongooseSchemaApiKey,
    },
    DateJoined: {
        type: Date,
        default: Date.now,
    },
    LoginFailCount: {
        type: Number,
        default: 0,
    },
    Roles: {
        type: [String],
        require: true,
    },
    Devices: {
        type: [mongooseSchemaDevice],
    },
    DateLastRequest: {
        type: Date,
    },
    Active: {
        type: Boolean,
        default: true,
    },
});

module.exports = userSchema;