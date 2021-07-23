require('dotenv').config();
//#region Variables
const Notification = require('../models/ModelCollection').NotificationModel;
//#endregion

//#region DBAccess
const findNotification = async() => {
    try {
        const notification = await Notification.find();
        if (!notification) {
            return { error: true, code: 404, message: 'Notification was not found' };
        } else {
            return notification;
        }
    } catch (err) {
        return { error: true, code: 500, message: err.message };
    }
};

const findNotificationById = async(id) => {
    try {
        const notification = await Notification.findById(id);
        if (!notification) {
            return { error: true, code: 404, message: 'Notification was not found' };
        } else {
            return notification;
        }
    } catch (err) {
        return { error: true, code: 500, message: err.message };
    }
};

const findNotificationByReadStatus = async(status) => {
    try {
        const notification = await Notification.find({ NotificationReadStatus: status });
        if (!notification) {
            return { error: true, code: 404, message: 'Notification was not found' };
        } else {
            return notification;
        }
    } catch (err) {
        return { error: true, code: 500, message: err.message };
    }
};

const CreateNewNotification = async(type, description, from, to) => {
    const notification = new Notification({
        NotificationType: type,
        NotificationDescription: description,
        NotificationSentFrom: from,
        NotificationSentTo: to,
    });


    try {
        const response = await notification.save();
        return response;
    } catch (err) {
        return { error: true, code: 500, message: err.message };
    }
};

const UpdateAllFieldsOfNotification = async(userName, password, id, dateCreated, type, description, readStatus, from, to) => {
    if (userName != process.env.ADMIN_PERMISSION_USERNAME || password != process.env.ADMIN_PERMISSION_PASSWORD) {
        return { error: true, code: 401, message: "Insufficient Permission" };
    }

    const updatedNotification = {
        NotificationCreationDate: dateCreated,
        NotificationType: type,
        NotificationDescription: description,
        NotificationReadStatus: readStatus,
        NotificationSentFrom: from,
        NotificationSentTo: to,
    };

    try {
        const notification = await Notification.findByIdAndUpdate(id, updatedNotification, { new: true });
        if (!notification) {
            return { error: true, code: 404, message: 'Notification was not found' };
        } else {
            return notification;
        }
    } catch (err) {
        return { error: true, code: 500, message: err.message };
    }
};

const UpdateNotificationReadStatus = async(id, readStatus) => {

    const updatedNotification = {
        NotificationReadStatus: readStatus,
    };

    try {
        const notification = await Notification.findByIdAndUpdate(id, updatedNotification, { new: true });
        if (!notification) {
            return { error: true, code: 404, message: 'Notification was not found' };
        } else {
            return notification;
        }
    } catch (err) {
        return { error: true, code: 500, message: err.message };
    }
};

const DeleteNotification = async(id) => {
    try {
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return { error: true, code: 404, message: 'Notification was not found' };
        } else {
            return notification;
        }
    } catch (err) {
        return { error: true, code: 500, message: err.message };
    }
};
//#endregion

//#region Export
module.exports = {
    findNotification,
    findNotificationById,
    findNotificationByReadStatus,
    CreateNewNotification,
    UpdateAllFieldsOfNotification,
    UpdateNotificationReadStatus,
    DeleteNotification,
};
//#endregion