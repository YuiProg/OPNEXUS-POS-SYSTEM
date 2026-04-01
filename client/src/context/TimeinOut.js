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
    TIMEIN,
    GETDATATIME
} = ApiConfig;


const TimeInOutStore = create((set) => ({
    timedIn: localStorage.getItem('timein') ? true : false,
    timeInHour: null,
    timeData: [],
    timeInLoading: false,
    loading: false,

    getData: async () => {
        set({timeInLoading: true});
        try {
            const response = await axiosInstance.get(GETDATATIME);
            const {data} = response.data;

            /* eslint-disable no-unused-vars */
            const cleanedData = data.map(
                ({
                _id,
                __v,
                createdAt,
                updatedAt,
                ...rest
                }) => rest,
            );
            set({timeData: cleanedData});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.message);
            }
        } finally {
            set({timeInLoading: false});
        }
    },

    timeIn: async (time, date) => {
        set({loading: true});
        try {
            const {checkAuth} = AuthStore.getState();
            set({timeInHour: time});
            set({timedIn: true});
            const { AuthUser } = AuthStore.getState();
            const fullName = `${AuthUser.firstName} ${AuthUser.middleName} ${AuthUser.lastName}`;

            const json = {
                employeeName: fullName,
                date: date,
                clockIn: time
            }

            //localStorage.setItem('timein', JSON.stringify(json));
            console.log(time);
            const timein = await axiosInstance.post(TIMEIN, {time});
            await checkAuth();
            console.log(timein.data);
            //const timedin = await axiosInstance.post(TIMEIN, AuthUser);
            //console.log(timedin);
            toast.success(timein.data.status);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.message);
            }
        } finally {
            set({loading: false});
        }   
    },

    timeOut: async (time, date) => {
        set({loading: true});
        try {
            const { AuthUser, checkAuth } = AuthStore.getState();
            
            const fullName = `${AuthUser.firstName} ${AuthUser.middleName} ${AuthUser.lastName}`;
            //const dataSaved = JSON.parse(localStorage.getItem('timein'));

            const payload = {
                employeeName: fullName,
                date: date,
                clockIn: AuthUser.time,
                clockOut: time
            };
            const timeout = await axiosInstance.post(TIMEOUT, payload);
            await checkAuth();
            const {data} = timeout.data;

            const updatedData = {
                employeeName: fullName,
                userId: data.userId,
                date: date,
                clockIn: AuthUser.time,
                clockOut: time
            }
            //console.log(timeout.data);
            //const cleanedData = data.map(({__v, _id, ...rest}) => rest);
            //console.log(cleanedData);
            set((state) => ({timeData: [updatedData, ...state.timeData]}));

            // localStorage.removeItem('timein');
            // localStorage.setItem('latestout', JSON.stringify(date));
            set({timeInHour: null});
            set({timedIn: false});
            toast.success(timeout.data.status);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.message);
            }
        } finally { 
            set({loading: false});
        }
    }

}));

export default TimeInOutStore;