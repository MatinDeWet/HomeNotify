//modules brought in (allows for there use), make use of Router
require('dotenv').config();
const express = require('express');
const userRouter = express.Router();
const User = require('../models/ModelCollection').UserModel;

const apiKeyMethods = require('../jsModules/apiKeys');


//#region GET
userRouter.get('/view', (req, res) => {
    res.send(apiKeyMethods.ValUser('23865wdekh'));
});
//#endregion

//#region POST

//#endregion

//#region PUT

//#endregion

//#region DELETE

//#endregion

//#region Export Modules
module.exports = userRouter;
//#endregion