//use mongoose to create a model for the database
const mongoose = require('mongoose');

const NotificationSchema = require('../schemas/notification');
const DeviceSchema = require('../schemas/devices');


module.exports = {
    NotificationModel: mongoose.model('Notification', NotificationSchema),
    DeviceModel: mongoose.model('Device', DeviceSchema),
}