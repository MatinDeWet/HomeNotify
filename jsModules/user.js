require('dotenv').config();
//#region Variables
const User = require('../models/ModelCollection').UserModel;
const {
    GenerateAPIKey,
} = require('../jsModules/apiKey');
//#endregion

//#region DBAccess
const findUser = async() => {
    try {
        const user = await User.find();
        if (!user) {
            return { error: { code: 404, message: 'User was not found' } };
        } else {
            return user;
        }
    } catch (err) {
        return { error: { code: 500, message: err } };
    }
};

const findUserById = async(id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return { error: { code: 404, message: 'User was not found' } };
        } else {
            return user;
        }
    } catch (err) {
        return { error: { code: 500, message: err } };
    }
};

const CreateUser = async(name, email, userRoles) => {
    const newUser = new User({
        Name: name,
        Email: email,
        APIKey: {
            Key: GenerateAPIKey(),
        },
        Roles: userRoles
    });

    try {
        const user = await newUser.save();
        return user;
    } catch (err) {
        return { error: { code: 500, message: err } };
    }
};

const UpdateUserStatus = async(id, activeUser) => {
    const updatedUser = {
        Active: activeUser,
    };

    try {
        const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
        if (!user) {
            return { error: { code: 404, message: 'User was not found' } };
        } else {
            return user;
        }
    } catch (err) {
        return { error: { code: 500, message: err } };
    }
};

const UpdateUser = async(id, name, email, activeUser) => {
    const updatedUser = {
        Name: name,
        Email: email,
        Active: activeUser,
    };

    try {
        const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
        if (!user) {
            return { error: { code: 404, message: 'User was not found' } };
        } else {
            return user;
        }
    } catch (err) {
        return { error: { code: 500, message: err } };
    }
};

const DeleteUser = async(id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return { error: { code: 404, message: 'User was not found' } };
        } else {
            return user;
        }
    } catch (err) {
        return { error: { code: 500, message: err } };
    }
};

//#region User Validation
const ReportAccount = async(inputKey) => {
    try {
        await User.updateOne({ "APIKey.Key": inputKey }, { $inc: { "KeyProtectionFailCount": 1 } });
        return true;
    } catch (err) {
        return false;
    }
};

const GetUserByApiKey = async(inputKey) => {
    return await User.findOne({ "APIKey.Key": inputKey });
};
//#endregion
//#endregion

//#region Export
module.exports = {
    findUser,
    findUserById,
    CreateUser,
    UpdateUserStatus,
    UpdateUser,
    DeleteUser,
    ReportAccount,
    GetUserByApiKey,
};
//#endregion