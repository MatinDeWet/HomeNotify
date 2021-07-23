//use mongoose to create a model for the database
const mongoose = require('mongoose');
const mongooseSchemaDevice = require('../schemas/device');

//create a model via a Schema
const notificationSchema = new mongoose.Schema({
    NotificationCreationDate: {
        type: Date,
        default: Date.now,
    },
    NotificationType: {
        type: String,
        enum: ['Food', 'Laundry', 'Cooking', 'Shopping'],
        require: true,
    },
    NotificationDescription: {
        type: String,
        maxLength: 255,
    },
    NotificationReadStatus: {
        type: Boolean,
        default: false,
    },
    NotificationSentFrom: {
        type: mongooseSchemaDevice,
        require: true,
    },
    NotificationSentTo: {
        type: mongooseSchemaDevice,
    },
});

module.exports = notificationSchema;