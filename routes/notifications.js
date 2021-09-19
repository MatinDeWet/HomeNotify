//modules brought in (allows for there use), make use of Router
const express = require('express');
const API = require('../middleware/apiAuthentication');
const { ROLE } = require('../jsModules/ApiRoles/apiRoles');
const notificationRouter = express.Router();
const {

} = require("../jsModules/Notifications/notification");


//#region GET
//#endregion

//#region POST
//#endregion

//#region PUT
//#endregion

//#region DELETE
//#endregion

//#region Export Modules
module.exports = notificationRouter;
//#endregion