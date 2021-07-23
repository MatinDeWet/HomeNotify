require('dotenv').config();

//modules brought in (allows for there use), make use of Router
const express = require('express');
const API = require('../jsModules/apiKey');
const userRouter = express.Router();
const {
    findUser,
    findUserById,
    CreateUser,
    UpdateUserStatus,
    UpdateUser,
    DeleteUser,
} = require("../jsModules/user");


//#region GET
//view one
userRouter.get('/view', API.ValidateKey, async(req, res) => {
    const user = await findUser();

    if (user.error != null) {
        res.status(user.code).json(user);
    } else {
        res.status(201).json(user);
    }
});
//View by Id
userRouter.get('/viewById', API.ValidateKey, async(req, res) => {
    const user = await findUserById(req.headers.user_id);

    if (user.error != null) {
        res.status(user.code).json(user);
    } else {
        res.status(201).json(user);
    }
});

//View by key
userRouter.get('/viewByKey', API.ValidateKey, async(req, res) => {
    const user = await ValidateUserByApiKey(req.headers.key);
    res.send(user);
    // if (user.error != null) {
    //     res.status(user.code).json(user);
    // } else {
    //     res.status(201).json(user);
    // }
});

//#endregion

//#region POST
//Create one
userRouter.post('/create', async(req, res) => {
    const user = await CreateUser(
        req.body.Name,
        req.body.Email
    );

    if (user.error != null) {
        res.status(user.code).json(user);
    } else {
        res.status(201).json(user);
    }
});
//#endregion

//#region PUT
//update user status
userRouter.put('/updateStatus', API.ValidateKey, async(req, res) => {
    const user = await UpdateUserStatus(
        req.body.UserId,
        req.body.UserStatus
    );

    if (user.error != null) {
        res.status(user.code).json(user);
    } else {
        res.status(201).json(user);
    }
});
userRouter.put('/update', API.ValidateKey, async(req, res) => {
    const user = await UpdateUser(
        req.body.UserId,
        req.body.Name,
        req.body.Email,
        req.body.UserStatus
    );

    if (user.error != null) {
        res.status(user.code).json(user);
    } else {
        res.status(201).json(user);
    }
});
//#endregion

//#region DELETE
//delete by id
userRouter.delete('/delete', API.ValidateKey, async(req, res) => {
    const user = await DeleteUser(
        req.body.UserId
    );
    if (user.error != null) {
        res.status(user.code).json(user);
    } else {
        res.status(201).json(user);
    }
});
//#endregion

//#region Export Modules
module.exports = userRouter;
//#endregion