require('dotenv').config();
//#region Variables
const FailReply = {
        CODE500: { code: 500, data: "Could not process request" },
        CODE400: { code: 400, data: "Please insure that all fields are filled and is a valid format" },
        CODE404: { code: 404, data: "Network Logged Item could not be found" },
        CODE409: { code: 409, data: "The information given already exists" },
    }
    //#endregion

//#region main methods
const PreformSpeedTest = async(user, deviceIdentifier, speedTestResults) => {
    //#region GetDevice Id
    let device = user.Devices.find(obj => {
        return obj.DeviceIdentifier === deviceIdentifier
    });
    //#endregion

    //#region Create user object
    //create a user object
    const newMonitor = {
        UserId: user._id,
        DeviceId: device._id,
        LogType: 'SpeedTest',
    };
    //#endregion

    //#region create and send New user
    const returnedUser = await CreateNew(newUser);
    if (returnedUser.errorId != null) { return FailReply.CODE500; }
    return { code: 200, data: returnedUser.user };
    //#endregion
};
//#endregion

//#region Support methods
//#endregion


//#region Export
module.exports = {
    //main methods
};
//#endregion