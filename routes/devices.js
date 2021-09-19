//modules brought in (allows for there use), make use of Router
const express = require('express');
const API = require('../middleware/apiAuthentication');
const { ROLE } = require('../jsModules/ApiRoles/apiRoles');
const deviceRouter = express.Router();
const {
    CreateDevice,
    FindAllDevices,
} = require("../jsModules/Deivces/device");


//#region GET
deviceRouter.get('/findall', API.ValidateUserByCredentials, async(req, res) => {
    const device = FindAllDevices(req.user);
    return res.status(device.code).json(device.data);
});
//#endregion

//#region POST
deviceRouter.post('/createone', API.ValidateUserByCredentials, async(req, res) => {
    const device = await CreateDevice(req.user, req.body.name, req.body.type);
    return res.status(device.code).json(device.data);
});
//#endregion

//#region PUT
//#endregion

//#region DELETE
//#endregion

//#region Export Modules
module.exports = deviceRouter;
//#endregion