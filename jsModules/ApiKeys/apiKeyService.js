//#region variables
const User = require('../../models/ModelCollection').UserModel;
const { FaultLogger, } = require('../Faults/fault');
//#endregion

//#region Methods
const CheckIfKeyExists = async() => {
    let returnedKey = { errorId: null, canContinue: false };
    try {
        const foundKey = await User.countDocuments({ "APIKey.Key": output });
        if (foundKey == 0) {
            returnedKey.canContinue = true;
        }
    } catch (err) {
        returnedKey.errorId = await FaultLogger("Api Key", "Check if Exists");
    }
};
//#endregion

//#region export
module.exports = {
    CheckIfKeyExists,
};
//#endregion