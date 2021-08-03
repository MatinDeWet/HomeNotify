require('dotenv').config();

//modules brought in (allows for there use), make use of Router
const express = require('express');
const API = require('../jsModules/ApiKeys/apiKey');
const userRouter = express.Router();
const {
    CreateUser,
    GetAllUsers,
    GetSingleUser,
} = require("../jsModules/Users/user");


//#region GET
//view one
userRouter.get('/viewall', async(req, res) => {
    const user = await GetAllUsers();
    return res.status(user.code).json(user.data);
});
//view one
userRouter.get('/viewone', async(req, res) => {
    const user = await GetSingleUser(req.user);
    return res.status(user.code).json(user.data);
});
//#endregion

//#region POST
//create one
userRouter.post('/createone', async(req, res) => {
    const user = await CreateUser(req.body.name, req.headers.authorization, req.body.userRoles);
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