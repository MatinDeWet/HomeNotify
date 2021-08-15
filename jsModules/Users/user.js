require('dotenv').config();
//#region Variables
const FailReply = {
    CODE500: { code: 500, data: "Could not process request" },
    CODE400: { code: 400, data: "Please insure that all fields are filled and is a valid format" },
    CODE404: { code: 404, data: "User could not be found" },
    CODE409: { code: 409, data: "The information given already exists" },
}
const { GenerateAPIKey, UpdateKey } = require('../ApiKeys/apiKey');
const { FindAll, TestEmailDuplicate, CreateNew, FindOneByemailAndPassword, } = require('../Users/userService');
//#endregion

//#region main methods
const CreateUser = async(name, emailPassword, userRoles) => {
    //#region validate user information
    if (!TestFieldsFilled([name, emailPassword, userRoles])) { return FailReply.CODE400; };
    const userCredentials = GetUsernamePasswordFromHeader(emailPassword);
    if (!TestValidateEmailFormat(userCredentials[0])) { return FailReply.CODE400; };
    const email = userCredentials[0];
    const password = userCredentials[1];
    //#endregion

    //#region Check for Duplicate Emails
    //insure email does not already exist
    const userEmail = await TestEmailDuplicate(email);
    if (userEmail.errorId != null) { return FailReply.CODE500; }
    if (userEmail.duplicatesFound) { return FailReply.CODE409; }
    //#endregion

    //#region Create user object
    //create a user object
    const newUser = {
        Name: name,
        Email: email,
        Password: password,
        Roles: userRoles
    };
    //#endregion

    //#region create and send New user
    const returnedUser = await CreateNew(newUser);
    if (returnedUser.errorId != null) { return FailReply.CODE500; }
    return { code: 200, data: returnedUser.user };
    //#endregion
};
const CreateApiKeyForUser = async(emailPassword) => {
    //#region validate user information
    if (!TestFieldsFilled([emailPassword])) { return FailReply.CODE400; };
    const userCredentials = GetUsernamePasswordFromHeader(emailPassword);
    if (!TestValidateEmailFormat(userCredentials[0])) { return FailReply.CODE400; };
    const email = userCredentials[0];
    const password = userCredentials[1];
    //#endregion

    //#region Check if user is valid and create user object
    const loggedUser = await TestForExistingUser(email, password);
    if (loggedUser.errorId != null) { return FailReply.CODE500; }
    if (loggedUser.user == null) { return FailReply.CODE404; }
    //#endregion

    //#region Generate API key
    const newKey = await GenerateAPIKey();
    if (newKey == null) { return FailReply.CODE500; }
    //#endregion

    //#region Update API Key
    const user = await UpdateKey(loggedUser.user._id, newKey);
    if (user.errorId != null) { return FailReply.CODE500; }
    //#endregion

    //#region send new Key
    return { code: 200, data: { "user-key": newKey } };
    //#endregion
};
const GetAllUsers = async() => {
    const returnedUser = await FindAll();
    if (returnedUser.errorId != null) { return FailReply.CODE500; }
    if (returnedUser.user == null) { return FailReply.CODE404; }

    return { code: 200, data: returnedUser.user };
};
const GetSingleUserByEmailAndPassword = async(emailPassword) => {
    //#region validate user information
    if (!TestFieldsFilled([emailPassword])) { return FailReply.CODE400; };
    const userCredentials = GetUsernamePasswordFromHeader(emailPassword);
    if (!TestValidateEmailFormat(userCredentials[0])) { return FailReply.CODE400; };
    const email = userCredentials[0];
    const password = userCredentials[1];
    //#endregion

    //#region Check if user is valid and create user object
    const loggedUser = await TestForExistingUser(email, password);
    if (loggedUser.errorId != null) { return FailReply.CODE500; }
    if (loggedUser.user == null) { return FailReply.CODE404; }
    //#endregion

    //#region return
    return {
        code: 200,
        data: {
            Name: loggedUser.user.Name,
            Email: loggedUser.user.Email,
            DateJoined: loggedUser.user.DateJoined,
            Roles: loggedUser.user.Roles,
            Active: loggedUser.user.Active,
            Key: loggedUser.user.APIKey.Key
        }
    }
    //#endregion
};
//#endregion

//#region Support methods
const TestFieldsFilled = (input) => {
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
const TestForExistingUser = async(email, password) => {
    return await FindOneByemailAndPassword(email, password);
};
//#endregion


//#region Export
module.exports = {
    //main methods
    CreateUser,
    CreateApiKeyForUser,
    GetAllUsers,
    GetSingleUserByEmailAndPassword,
};
//#endregion