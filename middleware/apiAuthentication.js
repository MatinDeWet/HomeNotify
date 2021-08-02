require('dotenv').config();

//#region variables
const {
    ValidateKey,
} = require("../jsModules/ApiKeys/apiKey");
const {
    ReportAccount,
    GetUserByApiKey,
} = require("../jsModules/Users/user");
const {
    ValidateAndDetectReplay,
    RecordRequest,
} = require("../jsModules/ApiRequests/request");
//#endregion

const ValidateRequest = async(req, res, next) => {
    //Api Key and Request informaiton
    const apiKey = req.header('x-api-key');
    const requestVerificationAgent = req.header('request-verification-agent');

    //#region Regex
    //set Regex formats
    let apiKeyFormat = new RegExp("^[a-zA-Z0-9]*$");
    let dateTimeFormat = new RegExp("^[A-Z0-9:.-]*$");
    let standardFormat = new RegExp("^[a-zA-Z0-9.-]*$");
    let base64Format = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$");
    let ipAddressFormat = new RegExp("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$");
    let macAddressFormat = new RegExp("^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$");
    //#endregion

    //#region Check if infomation is not null
    //check if headers are valid or filled
    if (apiKey == undefined || requestVerificationAgent == undefined) {
        return res.status(400).json({ error: { code: 400, message: 'Please insure that the following information if sent with your request (API Key - [x-api-key], Request Information - [request-agent]' } });
    };
    //#endregion

    //#region check is Verification agent is correct format to convert
    //validate that request-verification-agent is base 64
    if (!base64Format.test(requestVerificationAgent)) {
        return res.status(406).json({ error: { code: 406, message: 'Please insure that the request-verification-agent data is base64 encoded' } });
    };
    //#endregion

    //#region Verification agent to JSON
    //convert Request data to JSON (request-agent)
    const requestVerificationData = JSON.parse(Buffer.from(requestVerificationAgent, 'base64').toString('utf8'));
    //#endregion

    //#region test againts regex formats
    //Validate Verification data 
    if (!apiKeyFormat.test(apiKey) || apiKey.length != process.env.API_KEY_STRING_LENGTH) {
        return res.status(406).json({ error: { code: 406, message: 'Please provide the correct format for the Api Key' } });
    };
    if (!macAddressFormat.test(requestVerificationData.device_macAddress)) {
        return res.status(406).json({ error: { code: 406, message: 'Please provide the correct format for the Mac Address (xx-xx-xx-xx-xx-xx)' } });
    };
    if (!ipAddressFormat.test(requestVerificationData.device_ipV4Address)) {
        return res.status(406).json({ error: { code: 406, message: 'Please provide the correct format for the IP Address (xx.xx.xx.xx)' } });
    };
    if (!dateTimeFormat.test(requestVerificationData.request_time)) {
        return res.status(406).json({ error: { code: 406, message: 'Please provide the correct format for the Date and time (2021-07-27T07:08:44.416Z)' } });
    };
    if (!standardFormat.test(requestVerificationData.device_name) || !standardFormat.test(requestVerificationData.device_type)) {
        return res.status(406).json({ error: { code: 406, message: 'Please provide the correct format for the IP Address' } });
    };
    //#endregion

    //#region Verify Account and Request
    //check if the key key exists in the system
    if (!await ValidateKey(apiKey)) {
        return res.status(403).json({ error: { code: 403, message: 'Insufficient Permissions (Please insure that your acount details are correct, and or not blocked)' } });
    };

    //TODO Enable validation again

    //check and record API request to prevent replay attacks 
    // if (!await ValidateAndDetectReplay(apiKey, requestVerificationData.request_time, requestVerificationAgent)) {
    //     await ReportAccount(apiKey)
    //     return res.status(403).json({ error: { code: 403, message: 'Insufficient Permissions (Replay Detected!)' } });
    // };
    // if (!await RecordRequest(apiKey, requestVerificationData.request_time, requestVerificationAgent)) {
    //     return res.status(500).json({ error: { code: 500, message: 'Could not record request' } });
    // };
    //#endregion

    //#region add user to request (req)
    req.user = await GetUserByApiKey(apiKey);
    //#endregion
    next();
};

const AuthoriseUserRole = (neededRoles) => {
    return async(req, res, next) => {
        const userRoles = req.user.Roles;

        if (!neededRoles.some(match => userRoles.indexOf(match) >= 0)) {
            res.status(403).json({ error: { code: 403, message: 'Insufficient Permissions' } });
            return;
        }

        next();
    };
};

const AuthoriseUser = async(req, res, next) => {
    //check if header exists
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await userService.authenticate({ username, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid Authentication Credentials' });
    };

    //#region add user to request (req)
    req.user = user;
    next();
};


//#region Export Methods
module.exports = {
    ValidateRequest,
    AuthoriseUserRole,
    AuthoriseUser,
};
//#endregion