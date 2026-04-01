import ApiResponseModel from "../models/ApiResponseModel.js";
import Strings from "../strings/strings-codes.js";
import TimeinOut from "../models/timeinModel.js";
import User from "../models/UserModel.js";

const {
    ERROR,
    CREATED,
    TIME_IN_SUCC,
    TIME_OUT_SUCC,
    SUCCESS_MESS
} = Strings;

export const clockIn = async (req, res) => {
    const { userId } = req.user;
    const {time} = req.body;
    try {
        const fetchUser = await User.updateUser(userId, {timedIn: true, time});
        ApiResponseModel(res, CREATED, TIME_IN_SUCC, fetchUser);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const clockOut = async (req, res) => {
    const data = req.body;
    const {userId} = req.user;
    try {
        const updateUser = await User.updateUser(userId, {timedIn: false, time: null})
        const newTime = await TimeinOut.saveOut(data, userId);
        ApiResponseModel(res, CREATED, TIME_OUT_SUCC, newTime, updateUser);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getTimeData = async (req, res) => {
    const {userId} = req.user;
    try {
        const data = await TimeinOut.getData(userId);
        console.log('Fetching data for time in / out success');
        ApiResponseModel(res, CREATED, SUCCESS_MESS, data);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}