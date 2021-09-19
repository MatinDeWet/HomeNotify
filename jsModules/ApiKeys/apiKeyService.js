//#region variables
const User = require('../../models/ModelCollection').UserModel;
const { FaultLogger, } = require('../Faults/fault');
//#endregion

//#region Methods
const CheckIfKeyExists = async(userKey) => {
    let returnedKey = { errorId: null, canContinue: false };
    try {
        const foundKey = await User.countDocuments({ "APIKey.Key": userKey });
        if (foundKey == 0) {
            returnedKey.canContinue = true;
        }
    } catch (err) {
        returnedKey.errorId = await FaultLogger("Api Key", "Check if Exists");
    }
    return returnedKey;
};
const UpdateApiKey = async(id, key) => {
    let returnedUsers = { errorId: null, user: null };
    try {
        returnedUsers.user = await User.updateOne({ "_id": id }, { $set: { "APIKey.Key": key } });
    } catch (error) {
        returnedUsers.errorId = await FaultLogger("User", "Update api key");
    }
    return await returnedUsers;
};
//#endregion

//#region export
module.exports = {
    CheckIfKeyExists,
    UpdateApiKey,
};
//#endregion