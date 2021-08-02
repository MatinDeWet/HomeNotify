require('dotenv').config();
//#region Variables
const User = require('../../models/ModelCollection').UserModel;
const { GenerateAPIKey, } = require('../ApiKeys/apiKey');
const { FindAll, FindOne, TestEmailDuplicate, } = require('../Users/userService');
//#endregion

//#region InsertInformation
const CreateApiKey = async(email, password) => {
    const userId = await GetUserId(email, password);
    const newKey = await GenerateAPIKey();

    User.updateOne({ "_id": userId }, { "APIKey.Key": newKey });
};
//#endregion

//#region main methods
const CreateUser = async(name, email, password, userRoles) => {
    //#region Email validation with Regex
    //insure email is correct format
    let emailFormat = new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");
    if (!emailFormat.test(email)) {
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



    //create a user object
    const createdUser = new User({
        Name: name,
        Email: email,
        Password: password,
        Roles: userRoles
    });



    try {
        const user = await createdUser.save();

        const returnedCredentials = {
            "Active": user.Active,
            "Email": user.Email,
        };
        return returnedCredentials;
    } catch (err) {
        FaultLogger("JsModule:User", "CreateUser:CreateUser", err);
        return { error: { code: 500, message: "Could not create User" } };
    }
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
    return await User.findOne({ "APIKey.Key": inputKey });
};
const ReportAccount = async(inputKey) => {
    try {
        await User.updateOne({ "APIKey.Key": inputKey }, { $inc: { "KeyProtectionFailCount": 1 } });
        return true;
    } catch (err) {
        return false;
    }
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