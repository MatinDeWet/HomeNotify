//use mongoose to create a model for the database
const mongoose = require('mongoose');

const ApiKeySchema = require('../schemas/apikey');
const DeviceSchema = require('../schemas/device');
const NotificationSchema = require('../schemas/notification');
const UserSchema = require('../schemas/user');


module.exports = {
    ApiKeyModel: mongoose.model('ApiKey', ApiKeySchema),
    DeviceModel: mongoose.model('Device', DeviceSchema),
    NotificationModel: mongoose.model('Notification', NotificationSchema),
    UserModel: mongoose.model('User', UserSchema),
}