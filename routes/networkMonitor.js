require('dotenv').config();

//modules brought in (allows for there use), make use of Router
const express = require('express');
const API = require('../middleware/apiAuthentication');
const ROLE = require('../jsModules/ApiRoles/apiRoles').ROLE;
const networkMonitorRouter = express.Router();

//#region GET
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