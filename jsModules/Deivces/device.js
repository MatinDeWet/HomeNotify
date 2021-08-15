require('dotenv').config();
//#region Variables
const FailReply = {
    CODE500: { code: 500, data: "Could not process request" },
    CODE400: { code: 400, data: "Please insure that all fields are filled and is a valid format" },
    CODE404: { code: 404, data: "Device could not be found" },
    CODE409: { code: 409, data: "The information given already exists" },
}
const { CreateNew, } = require('../Deivces/deviceService');
//#endregion

//#region main methods
const FindAllDevices = (user) => {
    let returnedDevices = [];
    for (let index = 0; index < user.Devices.length; index++) {
        const fields = {
            DeviceName: user.Devices[index].DeviceName,
            DeviceType: user.Devices[index].DeviceType,
            DeviceIdentifier: user.Devices[index].DeviceIdentifier
        };
        returnedDevices.push(fields);
    }
    return { code: 200, data: returnedDevices };
};
const CreateDevice = async(user, name, type) => {
    //#region validate user information
    if (!TestFieldsFilled([name, type])) { return FailReply.CODE400; };
    //#endregion

    //#region Create user object
    //create a user object
    const newDevice = {
        DeviceName: name,
        DeviceType: type,
        DeviceIdentifier: GenerateIdentifier(user.Devices)
    };
    //#endregion

    //#region create and send New user
    const returnedDevice = await CreateNew(user, newDevice);
    if (returnedDevice.errorId != null) { return FailReply.CODE500; }
    return { code: 200, data: "Device created" };
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
const CheckIfIdentifierExists = (deviceArray, inputString) => {
    let exists = false;
    for (let index = 0; index < deviceArray.length; index++) {
        if (deviceArray[index].DeviceIdentifier == inputString) { exists = true; break; }
    }
    return exists;
};
const GenerateIdentifier = (deviceArray) => {
    let randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let canContinue = false;
    let output = '';

    while (!canContinue) {
        output = '';
        for (var i = 0; i < process.env.DEVICE_IDENTIFIER_LENGTH; i++) {
            output += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        if (deviceArray == undefined) {
            canContinue = true;
        } else {
            if (!CheckIfIdentifierExists(deviceArray, output)) {
                canContinue = true;
            }
        }


    }
    return output;
};
//#endregion


//#region Export
module.exports = {
    //main methods
    CreateDevice,
    FindAllDevices,
};
//#endregion