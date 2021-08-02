//use mongoose to create a model for the database
const mongoose = require('mongoose');
const mongooseSchemaApiKey = require('../schemas/apikey');

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
    KeyProtectionFailCount: {
        type: Number,
        default: 0,
    },
    Roles: {
        type: [String],
        require: true,
    },
    Active: {
        type: Boolean,
        default: true,
    },
});

module.exports = userSchema;