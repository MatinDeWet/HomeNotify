//modules brought in (allows for there use), make use of Router
const express = require('express');
const API = require('../jsModules/apiKey');
const deviceRouter = express.Router();
const {
    FindDevice,
} = require("../jsModules/device");


//#region GET
//view all
deviceRouter.get('/view', API.ValidateKey, async(req, res) => {
    const device = await FindDevice();

    if (device.error != null) {
        res.status(device.error.code).json(device);
    } else {
        res.status(201).json(device);
    }
});
//#endregion

//#region POST

//#endregion

//#region PUT

//#endregion

//#region DELETE

//#endregion

//#region Export Modules
module.exports = deviceRouter;
//#endregion