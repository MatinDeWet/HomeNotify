//modules brought in (allows for there use), make use of Router
const express = require('express');
const API = require('../middleware/apiAuthentication');
const notificationRouter = express.Router();
const {
    findNotification,
    findNotificationById,
    findNotificationByReadStatus,
    findNotificationByType,
    SendNotificaitonToOne,
    SendNotificaitonToAll,
    UpdateAllFieldsOfNotification,
    UpdateNotificationReadStatus,
    DeleteNotification,
} = require("../jsModules/notification");


//#region GET
//view all
notificationRouter.get('/view', API.AuthorizeRequest, API.AuthoriseUserRole(["admin1"]), async(req, res) => {
    const notification = await findNotification();

    if (notification.error != null) {
        res.status(notification.error.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});

//view single by id
notificationRouter.get('/viewById', API.AuthorizeRequest, async(req, res) => {
    const notification = await findNotificationById(req.body.notificationId);

    if (notification.error != null) {
        res.status(notification.error.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});

//view By ReadStatus
notificationRouter.get('/viewByReadStatus', API.AuthorizeRequest, async(req, res) => {
    const notification = await findNotificationByReadStatus(req.body.readStatus);

    if (notification.error != null) {
        res.status(notification.error.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});

//view By Type
notificationRouter.get('/viewByType', API.AuthorizeRequest, async(req, res) => {
    const notification = await findNotificationByType(req.body.type);

    if (notification.error != null) {
        res.status(notification.error.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});
//#endregion

//#region POST
//Create notificaiton sent to one device
notificationRouter.post('/SendToOne', API.AuthorizeRequest, async(req, res) => {
    const notification = await SendNotificaitonToOne(
        req.body.NotificationType,
        req.body.NotificationDescription,
        req.body.NotificationSentFrom,
        req.body.NotificationSentTo
    );

    if (notification.error != null) {
        res.status(notification.error.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});

//Create notificaiton sent to all device
notificationRouter.post('/SendToOne', API.AuthorizeRequest, async(req, res) => {
    const notification = await SendNotificaitonToAll(
        req.body.NotificationType,
        req.body.NotificationDescription,
        req.body.NotificationSentFrom
    );

    if (notification.error != null) {
        res.status(notification.error.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});
//#endregion

//#region PUT
//update All by fields id (Permisstion Required)
notificationRouter.put('/updateAllFields', API.AuthorizeRequest, async(req, res) => {
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
        res.status(notification.error.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});

//update read status
notificationRouter.put('/updateReadStatus', API.AuthorizeRequest, async(req, res) => {
    const notification = await UpdateNotificationReadStatus(
        req.body.NotificationId,
        req.body.NotificationReadStatus
    );

    if (notification.error != null) {
        res.status(notification.error.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});

//#endregion

//#region DELETE
//delete by id
notificationRouter.delete('/delete', API.AuthorizeRequest, async(req, res) => {
    const notification = await DeleteNotification(
        req.body.NotificationId
    );
    if (notification.error != null) {
        res.status(notification.error.code).json(notification);
    } else {
        res.status(201).json(notification);
    }
});
//#endregion

//#region Export Modules
module.exports = notificationRouter;
//#endregion