require('dotenv').config();
//#region variables
const Request = require('../../models/ModelCollection').RequestModel;
const User = require('../../models/ModelCollection').UserModel;
//#endregion

//#region Methods
const ValidateAndDetectReplay = async(key, dateTime, header) => {
    try {
        const foundRecords = await Request.countDocuments({ "ApiKey": key, "DateTimeUsed": dateTime, "RequestVirificaitonHeader": header });
        if (foundRecords > 0) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        return false;
    }

};
const RecordRequest = async(key, dateTime, header) => {
    const request = new Request({
        ApiKey: key,
        DateTimeUsed: dateTime,
        RequestVirificaitonHeader: header,
    });

    try {
        await request.save();
        return true;
    } catch (err) {
        return false;
    }

};
//#endregion


//#region Export Modules
module.exports = {
    ValidateAndDetectReplay,
    RecordRequest,
};
//#endregion