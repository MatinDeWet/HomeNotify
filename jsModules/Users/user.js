require('dotenv').config();
//#region Variables
const { GenerateAPIKey, } = require('../ApiKeys/apiKey');
const { FindAll, FindOne, TestEmailDuplicate, CreateNew, } = require('../Users/userService');
//#endregion

//#region InsertInformation
const CreateApiKey = async(email, password) => {
    // const userId = await GetUserId(email, password);
    // const newKey = await GenerateAPIKey();

    // User.updateOne({ "_id": userId }, { "APIKey.Key": newKey });
};
//#endregion

//#region main methods
const CreateUser = async(name, emailPassword, userRoles) => {

    //#region Check if infomation is not null
    if (name == undefined || emailPassword == undefined || userRoles == undefined) {
        return { code: 400, data: "Please insure that the following information is sent with your request (name - [name], email - [email], password - [password], roles - [userRoles])" };
    };
    //#endregion

    //#region Define email and password
    const credentialcombustion = GetUsernamePasswordFromHeader(emailPassword);
    const email = credentialcombustion[0];
    const password = credentialcombustion[1];
    //#endregion

    //#region Email validation with Regex
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailFormat.test(String(email).toLowerCase())) {
        return { code: 409, data: "please insure the provided email is valid" };
    }
    //#endregion

    //#region Check for Duplicate Emails
    //insure email does not already exist
    const userEmail = await TestEmailDuplicate(email);
    if (userEmail.errorId != null) {
        return { code: 500, data: "Could not process the request Your referance is: " + userEmail.errorId };
    }
    if (userEmail.duplicatesFound) {
        return { code: 409, data: "email could not be registered" };
    }
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
    console.log(returnedUser);
    if (returnedUser.errorId == null) {
        return { code: 200, data: returnedUser.user };
    } else {
        return { code: 500, data: "Could not process the request Your referance is: " + returnedUser.errorId };
    }
    //#endregion
};
const GetAllUsers = async() => {
    const returnedUser = await FindAll();
    if (returnedUser.errorId == null) {
        if (returnedUser.user == null) { return { code: 404, data: "No Users Found" }; };
        if (returnedUser.user != null) { return { code: 200, data: returnedUser.user }; };
    } else {
        return { code: 500, data: "Could not process the request Your referance is: " + returnedUser.errorId };
    }
};
const GetSingleUser = async(requestUser) => {
    const returnedUser = await FindOne(requestUser.APIKey.Key);
    if (returnedUser.errorId == null) {
        if (returnedUser.user == null) { return { code: 404, data: "No User Found" }; };
        if (returnedUser.user != null) { return { code: 200, data: returnedUser.user }; };
    } else {
        return { code: 500, data: "Could not process the request Your referance is: " + returnedUser.errorId };
    }
};
//#endregion

//#region borrowed methods
const GetUserByApiKey = async(inputKey) => {
    // return await User.findOne({ "APIKey.Key": inputKey });
};
const ReportAccount = async(inputKey) => {
    // try {
    //     await User.updateOne({ "APIKey.Key": inputKey }, { $inc: { "KeyProtectionFailCount": 1 } });
    //     return true;
    // } catch (err) {
    //     return false;
    // }
};
//#endregion

//#region Support methods
const GetUsernamePasswordFromHeader = (headerInput) => {
    const base64Credentials = headerInput.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    return [username, password] = credentials.split(':');
};
//#endregion


//#region Export
module.exports = {
    //main methods
    CreateUser,
    GetAllUsers,
    GetSingleUser,

    //borrowed methods
    GetUserByApiKey,
    ReportAccount,
};
//#endregion