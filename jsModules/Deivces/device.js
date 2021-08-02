require('dotenv').config();
//#region Variables
const Device = require('../../models/ModelCollection').DeviceModel;
//#endregion

//#region DBAccess
const FindDevice = async() => {
    try {
        const device = await Device.find();
        if (device.length <= 0) {
            return { error: { code: 404, message: 'Device was not found' } };
        } else {
            return device;
        }
    } catch (err) {
        return { error: { code: 500, message: err } };
    }
};
const CreateOrUpdateDevice = async() => {
    try {
        const device = await Device.find();
        if (device.length <= 0) {
            return { error: { code: 404, message: 'Device was not found' } };
        } else {
            return device;
        }
    } catch (err) {
        return { error: { code: 500, message: err } };
    }
};
//#endregion

//#region Export Modules
module.exports = {
    FindDevice,
};
//#endregion