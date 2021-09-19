//#region variables
const User = require('../../models/ModelCollection').UserModel;
const { FaultLogger, } = require('../Faults/fault');
//#endregion


//#region Methods
const CreateNew = async(user, inputDevice) => {
    let returnedDevice = { errorId: null, device: null };
    try {
        returnedDevice.device = await User.updateOne({ "_id": user._id }, { $push: { "Devices": inputDevice } });
    } catch (error) {
        returnedDevice.errorId = await FaultLogger("Device", "Create New");
    }

    return returnedDevice;
};
//#endregion

//#region export
module.exports = {
    CreateNew,
};
//#endregion