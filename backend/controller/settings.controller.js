import SystemSettings from "../models/SystemSettingsModel.js";
import ApiResponseModel from "../models/ApiResponseModel.js";
import Strings from "../strings/strings-codes.js";

const {
    UPDATESETTINGS,
    RESETSETTINGS,
    SETTINGSERROR,
    GETSETTINGS,
    SUCCESS,
    ERROR
} = Strings;

export const initializeSystemSettings = async () => {
    try {
        await SystemSettings.findOneAndUpdate(
            {}, 
            { $setOnInsert: {} }, 
            {
                upsert: true,      
                new: true,
                setDefaultsOnInsert: true  
            }
        );
        console.log('System settings initialized');
    } catch (error) {
        console.error('Failed to initialize system settings:', error);
    }
};

export const getSettings = async (req, res) => {
    try {
        const settings = await SystemSettings.findOne();
        ApiResponseModel(res, SUCCESS, GETSETTINGS, settings);
    } catch (error) {
        return ApiResponseModel(res, ERROR, error.message);
    }
}

export const setSettingsToDefault = async (req, res) => {
    try {
        const defaultSettings = new SystemSettings();
        const settings = await SystemSettings.findOneAndUpdate({}, defaultSettings, { new: true });
        ApiResponseModel(res, SUCCESS, RESETSETTINGS, settings);
    } catch (error) {
        ApiResponseModel(res, SETTINGSERROR, error.message);
    }   
}

export const updateSettings = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSettings = req.body;
        const settings = await SystemSettings.findByIdAndUpdate({_id: id}, updatedSettings, { new: true });
        if (!settings) {
            return ApiResponseModel(res, ERROR, 'Settings not found.');
        }
        ApiResponseModel(res, SUCCESS, UPDATESETTINGS, settings);
    } catch (error) {
        ApiResponseModel(res, SETTINGSERROR, error.message);
    }
}
    