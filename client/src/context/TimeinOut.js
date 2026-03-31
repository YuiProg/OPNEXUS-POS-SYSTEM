import { create } from "zustand";
import axiosError from "../helpers/axiosError";
import toast from "react-hot-toast";
import Strings from "../strings/strings-codes";
import ApiConfig from "../Api/ApiConfig";
import axiosInstance from "../helpers/axiosInstance";
import AuthStore from "./Authstore";

const {
    TIME_IN_SUCC,
    TIME_OUT_SUCC
} = Strings;

const {
    TIMEOUT,
    GETDATATIME
} = ApiConfig;


const TimeInOutStore = create((set) => ({
    timedIn: localStorage.getItem('timein') ? true : false,
    timeInHour: null,
    timeData: [],

    getData: async () => {
        try {
            const response = await axiosInstance.get(GETDATATIME);
            const {data} = response.data;
            /* eslint-disable no-unused-vars */
            const cleanedData = data.map(
                ({
                _id,
                __v,
                ...rest
                }) => rest,
            );
            set({timeData: cleanedData});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.message);
            }
        }
    },

    timeIn: async (time, date) => {
        try {
            const { AuthUser } = AuthStore.getState();
            const fullName = `${AuthUser.firstName} ${AuthUser.middleName} ${AuthUser.lastName}`;

            const json = {
                employeeName: fullName,
                date: date,
                clockIn: time
            }

            localStorage.setItem('timein', JSON.stringify(json));
            //const timedin = await axiosInstance.post(TIMEIN, AuthUser);
            //console.log(timedin);
            set({timeInHour: time});
            set({timedIn: true});
            toast.success(TIME_IN_SUCC);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.message);
            }
        }   
    },

    timeOut: async (time, date) => {
        try {
            const { AuthUser } = AuthStore.getState();
            const fullName = `${AuthUser.firstName} ${AuthUser.middleName} ${AuthUser.lastName}`;
            const dataSaved = JSON.parse(localStorage.getItem('timein'));

            const payload = {
                employeeName: fullName,
                date: date,
                clockIn: dataSaved.clockIn,
                clockOut: time
            };

            const timeout = await axiosInstance.post(TIMEOUT, payload);
            const {data} = timeout.data;
            
            const updatedData = {
                employeeName: fullName,
                userId: data.userId,
                date: date,
                clockIn: dataSaved.clockIn,
                clockOut: time
            }

            //const cleanedData = data.map(({__v, _id, ...rest}) => rest);
            //console.log(cleanedData);
            set((state) => ({timeData: [updatedData, ...state.timeData]}));

            localStorage.removeItem('timein');
            localStorage.setItem('latestout', JSON.stringify(date));
            set({timeInHour: null});
            set({timedIn: false});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.message);
            }
        }
    }

}));

export default TimeInOutStore;