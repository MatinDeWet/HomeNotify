require('dotenv').config();
//#region Variables
const FailReply = {
    CODE500: { code: 500, data: "Could not process request" },
    CODE400: { code: 400, data: "Please insure that all fields are filled and is a valid format" },
    CODE404: { code: 404, data: "Network Logged Item could not be found" },
    CODE409: { code: 409, data: "The information given already exists" },
};
const { FindOneByUserDeviceDateType, CreateNewSpeedTest, CreateNewSpeedTestOnExittingDay } = require('../NetworkMonitors/NetworkMonitorService');
//#endregion

//#region main methods
const PreformSpeedTest = async(user, deviceIdentifier, speedTestResults) => {
    //#region Get Device that performed Speed test
    let device = user.Devices.find(obj => {
        return obj.DeviceIdentifier === deviceIdentifier
    });
    //#endregion

    const testDate = speedTestResults.TestDateTime.toString().split("T")[0];

    //#region check if the speed is done on already existing date
    const existingTest = await FindOneByUserDeviceDateType(user._id, device._id, testDate, "SpeedTest");
    if (existingTest.errorId != null) { return FailReply.CODE500; }
    //#endregion

    //#region Implement Business logic
    const inputTime = new Date(speedTestResults.TestDateTime.toString());
    const ExistingTime = new Date(existingTest.monitor.LogType);
    if (inputTime.getTime() <= ExistingTime.getTime()) {
        return FailReply.CODE409;
    }
    if (existingTest.monitor.SpeedTest.length > process.env.SPEED_TEST_COUNT_PER_DAY) {
        return FailReply.CODE500;
    }
    //#endregion

    //#region Log Test
    if (existingTest.monitor == null) {
        const newMonitor = {
            UserId: user._id,
            DeviceId: device._id,
            LogDate: new Date(testDate),
            LogType: "SpeedTest"
        };
        const newSpeedtest = {
            TestTime: speedTestResults.TestDateTime,
            Ping: speedTestResults.TestPing,
            Download: speedTestResults.TestDown,
            Upload: speedTestResults.TestUp
        }
        const createdMonitor = await CreateNewSpeedTest(newMonitor, newSpeedtest);
        if (createdMonitor.errorId != null) { return FailReply.CODE500; }
        return { code: 200, data: "Speed test log created" };
    } else {
        const newSpeedtest = {
            TestTime: speedTestResults.TestDateTime,
            Ping: speedTestResults.TestPing,
            Download: speedTestResults.TestDown,
            Upload: speedTestResults.TestUp
        }

        const createdMonitor = await CreateNewSpeedTestOnExittingDay(existingTest.monitor, newSpeedtest);
        if (createdMonitor.errorId != null) { return FailReply.CODE500; }
        return { code: 200, data: "Speed test log created" };
    }
    //#endregion
};
//#endregion

//#region Support methods
//#endregion


//#region Export
module.exports = {
    PreformSpeedTest,
};
//#endregion