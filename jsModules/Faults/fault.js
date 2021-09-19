require('dotenv').config();
//#region Variables
const Fault = require('../../models/ModelCollection').FaultModel;
//#endregion

//#region Fault Logging
const FaultLogger = async(faultLocation, faultAction) => {
    const createdFault = new Fault({
        FaultRegion: faultLocation,
        FaultAction: faultAction
    });

    try {
        const fault = await createdFault.save();
        return fault._id;
    } catch (err) {
        console.log("FATAL FAULT");
        console.log(err);
    }
};
//#endregion

//#region Export
module.exports = {
    FaultLogger,
};
//#endregion