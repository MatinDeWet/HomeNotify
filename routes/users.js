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
userRouter.get('/viewOne', async(req, res) => {
    const user = await GetSingleUser(req.user);
    return res.status(user.code).json(user.data);
});
//#endregion

//#region POST
//create one
userRouter.get('/createOne', async(req, res) => {
    const user = await CreateUser(req.name, req.email, req.password, req.userRoles);
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