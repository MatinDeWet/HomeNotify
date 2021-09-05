require('dotenv').config();

//modules brought in (allows for there use), make use of Router
const express = require('express');
const API = require('../middleware/apiAuthentication');
const ROLE = require('../jsModules/ApiRoles/apiRoles').ROLE;
const networkMonitorRouter = express.Router();
const {
    PreformSpeedTest,
} = require("../jsModules/NetworkMonitors/NetworkMonitor");

//#region GET
networkMonitorRouter.post('/reportspeedtest', API.ValidateUserByApiKey, API.AuthoriseUserRole([ROLE.EDIT]), async(req, res) => {
    const result = {
        TestDateTime: req.body.Time,
        TestPing: req.body.Ping,
        TestDown: req.body.Download,
        TestUp: req.body.Upload,
    };

    const monitor = await PreformSpeedTest(req.user, req.body.DeviceIdentity, result);
    return res.status(monitor.code).json(monitor.data);
});
//#endregion

//#region POST
//#endregion

//#region PUT
//#endregion

//#region DELETE
//#endregion

//#region Export Modules
module.exports = networkMonitorRouter;
//#endregion