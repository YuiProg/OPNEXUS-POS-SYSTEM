import ApiResponseModel from "../models/ApiResponseModel.js";
import Strings from "../strings/strings-codes.js";
import TimeinOut from "../models/timeinModel.js";
import User from "../models/UserModel.js";
import {io} from '../lib/socket.js';


const {
    ERROR,
    CREATED,
    TIME_IN_SUCC,
    TIME_OUT_SUCC,
    SUCCESS_MESS
} = Strings;

const activeUsers = [];

export const clockIn = async (req, res) => {
    const { userId } = req.user;
    const {time} = req.body;
    try {
        const fetchUser = await User.updateUser(userId, {timedIn: true, time});
        const alreadyActive = activeUsers.some((i) => i._id === userId);
        if (!alreadyActive) {
            activeUsers.push(fetchUser);
            io.emit('onlineUsers', activeUsers);
        }
        io.emit("recentActivity", {message: `${fetchUser.username} just timed in!`, userId: fetchUser._id});
        console.log('\u001b[1;32mClock in success');
        ApiResponseModel(res, CREATED, TIME_IN_SUCC, fetchUser);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const clockOut = async (req, res) => {
    const data = req.body;
    const { userId } = req.user;
    try {
        const timeInVal = data.clockIn;
        const timeOutVal = data.clockOut;
        //CODE FROM CLAUDE AI
        const parseTime = (timeStr) => {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes, seconds] = time.split(':').map(Number);
            if (modifier === 'AM' && hours === 12) hours = 0;
            if (modifier === 'PM' && hours !== 12) hours += 12;
            const date = new Date();
            date.setHours(hours, minutes, seconds, 0);
            return date;
        };

        const inTime = parseTime(timeInVal);
        const outTime = parseTime(timeOutVal);

        // If outTime is earlier than inTime, the shift crossed midnight — add 1 day
        if (outTime <= inTime) {
            outTime.setDate(outTime.getDate() + 1);
        }

        const diffMs = outTime - inTime;
        const totalHours = Math.floor(diffMs / 1000 / 60 / 60);

        const index = activeUsers.findIndex((i) => i._id === userId);
        if (index !== -1) activeUsers.splice(index, 1);
        io.emit('onlineUsers', activeUsers);

        const updateUser = await User.updateUser(userId, { timedIn: false, time: null });
        const newTime = await TimeinOut.saveOut({ ...data, totalHours }, userId);
        console.log({ ...data, totalHours });
        console.log('\u001b[1;32mClock out success');
        io.emit("recentActivity", {message: `${updateUser.username} just timed out!`, userId: updateUser._id});
        ApiResponseModel(res, CREATED, TIME_OUT_SUCC, newTime, updateUser);
    } catch (error) {
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getTimeData = async (req, res) => {
    const {userId} = req.params;
    try {
        const data = await TimeinOut.getData(userId);
        
        
        console.log('\u001b[1;32mFetching data for time in / out success');
        ApiResponseModel(res, CREATED, SUCCESS_MESS, data);
    } catch (error) {
        console.log('\u001b[1;31mFetching data for time in / out fail');
        ApiResponseModel(res, ERROR, error.message);
    }
}

export const getAllTimeData = async (req, res) => {
    try {
        const data = await TimeinOut.getAllData();
        ApiResponseModel(res, CREATED, SUCCESS_MESS, data);
        console.log('\u001b[1;32mFetching all data for time in / out success');
    } catch (error) {
        console.log('\u001b[1;31mFetching all data for time in / out fail');
        ApiResponseModel(res, ERROR, error.message);
    }
}