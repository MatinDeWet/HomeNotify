//use mongoose to create a model for the database
const mongoose = require('mongoose');

//create a model via a Schema
const apiSchema = new mongoose.Schema({
    Key: {
        type: String,
        require: true,
    },
    DateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = apiSchema;