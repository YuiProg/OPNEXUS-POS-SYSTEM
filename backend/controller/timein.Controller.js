import ApiResponseModel from "../models/ApiResponseModel.js";
import Strings from "../strings/strings-codes.js";
import TimeinOut from "../models/timeinModel.js";

const {
    ERROR,
    CREATED,
    TIME_IN_SUCC,
    SUCCESS_MESS
} = Strings;

export const clockOut = async (req, res) => {
    const data = req.body;
    const {userId} = req.user;
    try {
        const newTime = await TimeinOut.saveOut(data, userId);
        ApiResponseModel(res, CREATED, TIME_IN_SUCC, newTime);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getTimeData = async (req, res) => {
    const {userId} = req.user;
    console.log(userId);
    try {
        const data = await TimeinOut.getData(userId);
        ApiResponseModel(res, CREATED, SUCCESS_MESS, data);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}