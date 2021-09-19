//use mongoose to create a model for the database
const mongoose = require('mongoose');

const NetworkMonitorSchema = require('../schemas/networkMonitor');
const ApiKeySchema = require('../schemas/apikey');
const DeviceSchema = require('../schemas/device');
const NotificationSchema = require('../schemas/notification');
const UserSchema = require('../schemas/user');
const RequestSchema = require('../schemas/request');
const FaultSchema = require('../schemas/fault');


module.exports = {
    NetworkMonitorModel: mongoose.model('NetworkMonitor', NetworkMonitorSchema),
    ApiKeyModel: mongoose.model('ApiKey', ApiKeySchema),
    DeviceModel: mongoose.model('Device', DeviceSchema),
    NotificationModel: mongoose.model('Notification', NotificationSchema),
    UserModel: mongoose.model('User', UserSchema),
    RequestModel: mongoose.model('Request', RequestSchema),
    FaultModel: mongoose.model('Fault', FaultSchema),
}