//modules brought in (allows for there use), make use of Router
require('dotenv').config();
const express = require('express');
const notificationRouter = express.Router();
const Notification = require('../models/ModelCollection').NotificationModel;


//#region GET
//view all
notificationRouter.get('/view', async(req, res) => {
    try {
        const notification = await Notification.find();
        if (!notification) {
            res.status(404).json({ message: 'Notification was not found' });
        } else {
            res.status(201).json(notification);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//view single by id
notificationRouter.get('/viewById/:notification_id', async(req, res) => {
    try {
        const notification = await Notification.findById(req.params.notification_id);
        if (!notification) {
            res.status(404).json({ message: 'Notification was not found' });
        } else {
            res.status(201).json(notification);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//view single on ReadStatus
notificationRouter.get('/viewByReadStatus/:readStatus', async(req, res) => {
    try {
        const notification = await Notification.find({ NotificationReadStatus: req.params.readStatus });
        if (!notification) {
            res.status(404).json({ message: 'Notification was not found' });
        } else {
            res.status(201).json(notification);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//#endregion

//#region POST
//Create one
notificationRouter.post('/create', async(req, res) => {
    const notification = new Notification({
        NotificationCreationDate: req.body.NotificationCreationDate,
        NotificationType: req.body.NotificationType,
        NotificationDescription: req.body.NotificationDescription,
        NotificationReadStatus: req.body.NotificationReadStatus,
        NotificationSentFrom: req.body.NotificationSentFrom,
        NotificationSentTo: req.body.NotificationSentTo,
    });

    try {
        const result = await notification.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//#endregion

//#region PUT
//update All by fields id (Permisstion Required)
notificationRouter.put('/updateAllFields/:notification_id', async(req, res) => {
    if (process.env.PERMISSION_USERNAME == req.body.UserName && process.env.PERMISSION_PASSWORD == req.body.Password) {
        const notification = {
            NotificationCreationDate: req.body.NotificationCreationDate,
            NotificationType: req.body.NotificationType,
            NotificationDescription: req.body.NotificationDescription,
            NotificationReadStatus: req.body.NotificationReadStatus,
            NotificationSentFrom: req.body.NotificationSentFrom,
            NotificationSentTo: req.body.NotificationSentTo,
        };

        try {
            Notification.findByIdAndUpdate(req.params.notification_id, notification, (err, docs) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    if (docs != null) {
                        res.status(201).json(docs);
                    } else {
                        res.status(404).json({ message: "The Item Requested does not Exist" });
                    }

                }
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: "Insufficient Permission" });
    }
});

//update by id
notificationRouter.put('/update/:notification_id', async(req, res) => {
    const notification = {
        NotificationType: req.body.NotificationType,
        NotificationDescription: req.body.NotificationDescription,
        NotificationReadStatus: req.body.NotificationReadStatus,
    };

    try {
        Notification.findByIdAndUpdate(req.params.notification_id, notification, (err, docs) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                if (docs != null) {
                    res.status(201).json(docs);
                } else {
                    res.status(404).json({ message: "The Item Requested does not Exist" });
                }

            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//#endregion

//#region DELETE
//delete by id
notificationRouter.delete('/delete/:notification_id', async(req, res) => {
    try {
        Notification.findByIdAndDelete(req.params.notification_id, (err, docs) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                if (docs != null) {
                    res.status(201).json(docs);
                } else {
                    res.status(404).json({ message: "The Item Requested does not Exist" });
                }

            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//#endregion

//#region Export Modules
module.exports = notificationRouter;
//#endregion