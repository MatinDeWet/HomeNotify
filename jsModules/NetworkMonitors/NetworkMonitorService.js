//#region variables
const Monitor = require('../../models/ModelCollection').NetworkMonitorModel;
const { FaultLogger, } = require('../Faults/fault');
//#endregion


//#region Methods
const FindOneByUserDeviceDateType = async(usedID, deviceID, logDate, logType) => {


    let returnedMonitor = { errorId: null, monitor: null };
    try {
        const monitor = await Monitor.findOne({ UserId: usedID, DeviceId: deviceID, LogDate: new Date(logDate), LogType: logType });

        if (monitor != null) { returnedMonitor.monitor = monitor; };
    } catch (err) {
        returnedMonitor.errorId = await FaultLogger("Network Monitor", "Find one by user device date type");
    }
    return returnedMonitor;
};
const CreateNewSpeedTest = async(monitorInput, speedtestIpnut) => {
    const monitor = new Monitor(monitorInput);
    let returnedSpeedtest = { errorId: null, speedTest: null };
    try {
        const pushedSpeedTest = await monitor.SpeedTest.push(speedtestIpnut);
        const createdMonitor = await monitor.save();

        returnedSpeedtest.speedTest = createdMonitor;
    } catch (error) {
        returnedSpeedtest.errorId = await FaultLogger("Network Monitor", "Create new speed test");
    }

    return returnedSpeedtest;
};
const CreateNewSpeedTestOnExittingDay = async(monitorInput, newTest) => {
    let returnedSpeedtest = { errorId: null, speedTest: null };
    try {
        returnedSpeedtest.speedTest = await Monitor.updateOne({ "_id": monitorInput._id }, { $push: { "SpeedTest": newTest } });
    } catch (error) {
        returnedSpeedtest.errorId = await FaultLogger("Network Monitor", "Create New Speed Test On Exitting Day");
    }

    return returnedSpeedtest;
};
//#endregion

//#region export
module.exports = {
    FindOneByUserDeviceDateType,
    CreateNewSpeedTest,
    CreateNewSpeedTestOnExittingDay,
};
//#endregion