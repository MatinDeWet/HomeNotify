//use mongoose to create a model for the database
const mongoose = require('mongoose');

//create a model via a Schema
const requestSchema = new mongoose.Schema({
    ApiKey: {
        type: String,
        require: true,
    },
    DateTimeUsed: {
        type: Date,
        require: true,
    },
    RequestVirificaitonHeader: {
        type: String,
        require: true,
    },
});

module.exports = requestSchema;