//modules brought in (allows for there use), make use of Router
const express = require('express');
const API = require('../jsModules/apiKey');
const notificationRouter = express.Router();
const {
    findNotification,
    findNotificationById,
    findNotificationByReadStatus,
    CreateNewNotification,
    UpdateAllFieldsOfNotification,
    UpdateNotificationReadStatus,
    DeleteNotification,
} = require("../jsModules/notification");


//#region GET
//view all
notificationRouter.get('/view', API.ValidateKey, async(req, res) => {
    const notification = await findNotification();

    if (notification.error != null) {
        res.status(notification.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});

//view single by id
notificationRouter.get('/viewById', API.ValidateKey, async(req, res) => {
    const notification = await findNotificationById(req.headers.notification_id);

    if (notification.error != null) {
        res.status(notification.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});

//view single on ReadStatus
notificationRouter.get('/viewByReadStatus', API.ValidateKey, async(req, res) => {
    const notification = await findNotificationByReadStatus(req.headers.read_status);

    if (notification.error != null) {
        res.status(notification.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});
//#endregion

//#region POST
//Create one
notificationRouter.post('/create', API.ValidateKey, async(req, res) => {
    const notification = await CreateNewNotification(
        req.body.NotificationType,
        req.body.NotificationDescription,
        req.body.NotificationSentFrom,
        req.body.NotificationSentTo
    );

    if (notification.error != null) {
        res.status(notification.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});
//#endregion

//#region PUT
//update All by fields id (Permisstion Required)
notificationRouter.put('/updateAllFields', API.ValidateKey, async(req, res) => {
    const notification = await UpdateAllFieldsOfNotification(
        req.body.AdminUserName,
        req.body.AdminPassword,
        req.body.NotificationId,
        req.body.NotificationCreationDate,
        req.body.NotificationType,
        req.body.NotificationDescription,
        req.body.NotificationReadStatus,
        req.body.NotificationSentFrom,
        req.body.NotificationSentTo
    );

    if (notification.error != null) {
        res.status(notification.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});

//update read status
notificationRouter.put('/updateReadStatus', API.ValidateKey, async(req, res) => {
    const notification = await UpdateNotificationReadStatus(
        req.body.NotificationId,
        req.body.NotificationReadStatus
    );

    if (notification.error != null) {
        res.status(notification.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});

//#endregion

//#region DELETE
//delete by id
notificationRouter.delete('/delete', API.ValidateKey, async(req, res) => {
    const notification = await DeleteNotification(
        req.body.NotificationId
    );
    if (notification.error != null) {
        res.status(notification.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});
//#endregion

//#region Export Modules
module.exports = notificationRouter;
//#endregion