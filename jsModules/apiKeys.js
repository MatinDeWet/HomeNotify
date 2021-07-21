//#region Fields
const User = require('../models/ModelCollection').UserModel;
//#endregion

//#region Methods
const GenerateAPIKey = () => {
    return [...Array(30)]
        .map((e) => ((Math.random() * 36 | 0)).toString(36))
        .join('');
};

const GenerateUser = (_name, _email) => {
    let user = {
        Name: _name,
        Email: _email,
        APIKey: GenerateAPIKey(),
    };
    return user;
};

const ValidateUser = async(_key) => {
    try {
        const notification = await Notification.find({ APIKey: _key });
        if (!notification) {
            return notification;
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
};
//#endregion


//#region Export Modules
module.exports = {
    GenUser: GenerateUser(),
    ValUser: ValidateUser(),
};
//#endregion