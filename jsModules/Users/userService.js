//#region variables
const User = require('../../models/ModelCollection').UserModel;
const { FaultLogger, } = require('../Faults/fault');
//#endregion


//#region Methods
const FindAll = async() => {
    let returnedUsers = { errorId: null, user: null };
    try {
        const user = await User.find({}, { Name: 1, Email: 1, DateJoined: 1, Roles: 1, Active: 1 });
        if (user.length > 0) { returnedUsers.user = user; };
    } catch (err) {
        returnedUsers.errorId = await FaultLogger("User", "Find All");
    }
    return returnedUsers;
};
const FindOne = async(inputKey) => {
    let returnedUsers = { errorId: null, user: null };
    try {
        const user = await User.findOne({ "APIKey.Key": inputKey }, { Name: 1, Email: 1, DateJoined: 1, Roles: 1, Active: 1 });
        if (user.length > 0) { returnedUsers.user = user; };
    } catch (err) {
        returnedUsers.errorId = await FaultLogger("User", "Find One");
    }
    return returnedUsers;
};
const TestEmailDuplicate = async(inputEmail) => {
    let returnedUsers = { errorId: null, duplicatesFound: null };
    try {
        const emailCount = await User.countDocuments({ "Email": inputEmail });
        if (emailCount > 0) { duplicatesFound = true; } else { duplicatesFound = false; }
    } catch (err) {
        returnedUsers.errorId = await FaultLogger("User", "Test Email Duplicte");
    }
    return returnedUsers
};
//#endregion

//#region export
module.exports = {
    FindAll,
    FindOne,
    TestEmailDuplicate,
};
//#endregion