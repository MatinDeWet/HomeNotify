require('dotenv').config();

//modules brought in (allows for there use), make use of Router
const express = require('express');
const API = require('../middleware/apiAuthentication');
const ROLE = require('../jsModules/ApiRoles/apiRoles').ROLE;
const userRouter = express.Router();
const {
    CreateUser,
    CreateApiKeyForUser,
    GetAllUsers,
    GetSingleUserByEmailAndPassword,
} = require("../jsModules/Users/user");


//#region GET
//view one
userRouter.get('/viewall', API.ValidateRequest, API.ValidateDevice, API.AuthoriseUserRole([ROLE.ADMIN]), async(req, res) => {
    const user = await GetAllUsers();
    return res.status(user.code).json(user.data);
});
//view one
userRouter.get('/viewself', async(req, res) => {
    const user = await GetSingleUserByEmailAndPassword(req.headers.authorization);
    return res.status(user.code).json(user.data);
});
//#endregion

//#region POST
//create one
userRouter.post('/createone', async(req, res) => {
    const user = await CreateUser(req.body.name, req.headers.authorization, req.body.userRoles);
    return res.status(user.code).json(user.data);
});
userRouter.post('/createapikey', async(req, res) => {
    const user = await CreateApiKeyForUser(req.headers.authorization);
    return res.status(user.code).json(user.data);
});
//#endregion

//#region PUT
//#endregion

//#region DELETE
//#endregion

//#region Export Modules
module.exports = userRouter;
//#endregion