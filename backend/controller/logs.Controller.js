import ApiResponseModel from "../models/ApiResponseModel.js";
import SystemLogs from "../models/SystemLogs.js";
import Strings from "../strings/strings-codes.js";

const {
    ERROR,
    CREATED,
    GETLOGS
} = Strings;

export const getLogs = async (req, res) => {
    try {
        const {branch} = req.params;
        const logs = await SystemLogs.getLogs(branch);
        ApiResponseModel(res, CREATED, GETLOGS, logs);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}