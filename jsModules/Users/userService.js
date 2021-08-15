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
const FindOneByKey = async(inputKey) => {
    let returnedUsers = { errorId: null, user: null };
    try {
        const user = await User.findOne({ "APIKey.Key": inputKey });
        returnedUsers.user = user;
    } catch (err) {
        returnedUsers.errorId = await FaultLogger("User", "Find One by key");
    }
    return returnedUsers;
};
const FindOneByemailAndPassword = async(email, password) => {
    let returnedUsers = { errorId: null, user: null };
    try {
        const user = await User.findOne({ Email: email, Password: password }, { Name: 1, Email: 1, DateJoined: 1, Roles: 1, Active: 1, "APIKey.Key": 1 });

        if (user != null) { returnedUsers.user = user; };
    } catch (err) {
        returnedUsers.errorId = await FaultLogger("User", "Find One by email and password");
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
const CreateNew = async(inputUser) => {
    const user = new User(inputUser);
    let returnedUsers = { errorId: null, user: null };
    try {
        returnedUsers.user = await user.save();
        returnedUsers.user = {
            Name: returnedUsers.user.Name,
            Email: returnedUsers.user.Email,
            Active: returnedUsers.user.Active,
            Roles: returnedUsers.user.Roles
        };
    } catch (error) {
        returnedUsers.errorId = await FaultLogger("User", "Create New");
    }

    return returnedUsers;
};
const UpdateRequestTimeStamp = async(id, time) => {
    let returnedUsers = { errorId: null, user: null };
    try {
        returnedUsers.user = await User.updateOne({ "_id": id }, { $set: { "DateLastRequest": time } });
    } catch (error) {
        returnedUsers.errorId = await FaultLogger("User", "Update request time stamp");
    }
    return await returnedUsers;
};
//#endregion

//#region export
module.exports = {
    FindAll,
    FindOneByKey,
    FindOneByemailAndPassword,
    TestEmailDuplicate,
    CreateNew,
    UpdateRequestTimeStamp,
};
//#endregion