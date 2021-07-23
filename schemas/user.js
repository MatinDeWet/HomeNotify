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
        maxLength: 100,
    },
    APIKey: {
        type: mongooseSchemaApiKey,
        require: true,
    },
    DateJoined: {
        type: Date,
        default: Date.now,
    },
    Active: {
        type: Boolean,
        default: true,
    },
});

module.exports = userSchema;