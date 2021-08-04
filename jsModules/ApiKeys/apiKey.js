require('dotenv').config();
//#region variables
const { FindAll, FindOneByKey, TestEmailDuplicate, CreateNew, FindOneByemailAndPassword, } = require('../ApiKeys/apiKeyService');
const User = require('../../models/ModelCollection').UserModel;
//#endregion

//#region Methods
const GenStringBase64 = () => {
    switch (Math.floor(Math.random() * 4)) {
        case 0:
            return "FTVBgbZ1Kcyah0iRMUnuPDrsOH3NWpS52f7qo6k8QCGdje9LzEJvlxAmXI4wYt";
        case 1:
            return "sAOwnCpD40TLH9YGxgBR5mKbtivVNh2rUEIyjaodPqQuZX36MJzScFkf1elW78";
        case 2:
            return "WsM7CUx6Qpmh05SgdtBuqRVyH1wJeIOzZrEa2lFiDALn4YfTj3KXoGb8cvkNP9";
        case 3:
            return "rAxmybS6vL5Pn9Q0iRlodXtzeHpIfUWwkqj2g81saYuFBGcNK7VZM34JhTOCED";
    }
}

const GenerateAPIKey = async() => {
    let randomChars = GenStringBase64();
    let canContinue = false;
    let failCount = 0;
    let output = '';

    while (!canContinue) {
        output = '';
        for (var i = 0; i < process.env.API_KEY_STRING_LENGTH; i++) {
            output += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        const existingKey = CheckIfKeyExists(output);
        if (existingKey.errorId != null) {
            failCount++;
        }
        if (failCount > 5) {
            return { code: 500, data: "Could not process the request Your referance is: " + existingKey.errorId };
        }
        canContinue = existingKey.canContinue;
    }

    return output;
};

const ValidateKey = async(api_key) => {
    try {
        const foundKey = await User.countDocuments({ "APIKey.Key": api_key, "KeyProtectionFailCount": { $lt: 5 } });
        if (foundKey <= 0) {
            return false;
        } else {
            return true;
        }
    } catch (err) {
        return false;
    }

};
//#endregion


//#region Export Modules
module.exports = {
    GenerateAPIKey,
    ValidateKey,
};
//#endregion