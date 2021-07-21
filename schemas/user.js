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
    Username: {
        type: String,
        require: true,
        maxLength: 100,
    },
    Password: {
        type: String,
    },
    APIKeys: {
        type: [mongooseSchemaApiKey],
    },
    DateJoined: {
        type: Date,
        default: Date.now,
    },
});

module.exports = userSchema;