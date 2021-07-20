//use mongoose to create a model for the database
const mongoose = require('mongoose');
const mongooseDevice = require('../schemas/devices');

//vreate a model via a Schema
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
        type: mongooseDevice,
        require: true,
    },
    NotificationSentTo: {
        type: mongooseDevice,
    },
});

module.exports = notificationSchema;