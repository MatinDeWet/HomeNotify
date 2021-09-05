require('dotenv').config();

//#region variables
const InputFormat = {
    apiKeyFormat: new RegExp("^[a-zA-Z0-9]*$"),
    dateTimeFormat: new RegExp("^[A-Z0-9:.-]*$"),
    deviceIdentityFormat: new RegExp("^[a-zA-Z0-9]*$"),
    base64Format: new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"),
};
const FailReply = {
    CODE500: { code: 500, data: "Could not process request" },
    CODE400: { code: 400, data: "Please insure that all fields are filled and is a valid format" },
    CODE403: { code: 403, data: "Insufficient Permissions" },
    CODE404: { code: 404, data: "User could not be found with provided Api Key" },
    CODE409: { code: 409, data: "The information given already exists" },
};
const ROLE = require('../jsModules/ApiRoles/apiRoles').ROLE;
const { FindOneByKey, UpdateRequestTimeStamp, FindOneByemailAndPassword } = require('../jsModules/Users/userService');
//#endregion

//#region main methods
const ValidateUserByCredentials = async(req, res, next) => {
    const emailPassword = req.headers.authorization;

    //#region validate user information
    if (!TestFieldsFilled([emailPassword])) { return FailReply.CODE400; };
    const userCredentials = GetUsernamePasswordFromHeader(emailPassword);
    if (!TestValidateEmailFormat(userCredentials[0])) { return FailReply.CODE400; };
    const email = userCredentials[0];
    const password = userCredentials[1];
    //#endregion

    //#region Check if user is valid and create user object
    const loggedUser = await FindOneByemailAndPassword(email, password);
    if (loggedUser.errorId != null) { return FailReply.CODE500; }
    if (loggedUser.user == null) { return FailReply.CODE404; }
    //#endregion

    req.user = loggedUser.user;
    next();
};

const ValidateUserByApiKey = async(req, res, next) => {
    const apiKey = req.header('x-api-key');

    //#region validate user information
    if (!TestFieldsFilled([apiKey])) { return FailReply.CODE400; };
    if (!TestValidateBase64Format(apiKey)) { return FailReply.CODE400; };
    //#endregion

    //#region Check if user is valid and create user object
    const loggedUser = await FindOneByKey(apiKey);
    if (loggedUser.errorId != null) { return FailReply.CODE500; }
    if (loggedUser.user == null) { return FailReply.CODE404; }

    req.user = loggedUser.user;
    //#endregion

    const timeNow = new Date();

    //#region test for call timeout
    if (req.user.APIKey.LastUsed != undefined || req.user.APIKey.LastUsed != null) {

        //difference in sec
        const diffInSec = Math.abs((timeNow.getTime() - req.user.APIKey.LastUsed.getTime()) / 1000);
        //the min sec between a call per person
        const timeDifferenceRequired = 60 / process.env.API_CALL_LIMIT;

        //check time difference limit is satisfied
        if (diffInSec <= timeDifferenceRequired) { return FailReply.CODE500; }
    }
    //#endregion

    //#region update last request time
    const updatedTimeUser = await UpdateRequestTimeStamp(req.user._id, timeNow);
    if (updatedTimeUser.errorId != null) { return FailReply.CODE500; }
    //#endregion

    next();
};

const ValidateDevice = async(req, res, next) => {
    //#region variables
    const deviceArray = req.user.Devices;
    const deviceIdentity = JSON.parse(Buffer.from(req.header('request-verification-agent'), 'base64').toString('utf8')).request_device_identity;
    //#endregion

    //#region Check if device is registered with user
    for (let index = 0; index < deviceArray.length; index++) {
        if (deviceArray[index].DeviceIdentifier == deviceIdentity) { canContinue = true; }
    }
    if (!canContinue) { return res.status(FailReply.CODE403.code).send(FailReply.CODE403.data); }
    //#endregion

    next();
};

const AuthoriseUserRole = (neededRoles) => {
    return async(req, res, next) => {
        const userRoles = req.user.Roles;

        //if used super admin, they can preform any task
        if (userRoles.includes(ROLE.SUPERADMIN)) { return next(); }

        if (!neededRoles.some(match => userRoles.indexOf(match) >= 0)) { return res.status(FailReply.CODE403.code).send(FailReply.CODE403.data); }
        next();
    };
};
//#endregion

//#region Support methods
const TestFieldsFilled = (input) => {
    //#region test if all fields required are filled
    if (input.length == 0) {
        return false;
    }
    for (let index = 0; index < input.length; index++) {
        if (input[index] == undefined || input[index] == null) {
            return false;
        }
    }
    return true;
};
const GetUsernamePasswordFromHeader = (headerInput) => {
    const base64Credentials = headerInput.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    return [username, password] = credentials.split(':');
};
const TestValidateEmailFormat = (email) => {
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailFormat.test(String(email).toLowerCase())) {
        return false;
    }
    return true;
};
const TestValidateBase64Format = (apiKey) => {
    const apiKeyFormat = /^[0-9a-zA-Z]+$/;
    if (!apiKeyFormat.test(apiKey)) {
        return false;
    }
    return true;
};
//#endregion

//#region Export Methods
module.exports = {
    ValidateUserByCredentials,
    ValidateUserByApiKey,
    ValidateDevice,
    AuthoriseUserRole,
};
//#endregion