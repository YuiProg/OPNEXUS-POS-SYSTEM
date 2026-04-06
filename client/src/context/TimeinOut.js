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
    GETDATATIME,
    SETBRANCHACTIVE,
    SETBRANCHOFFLINE,
    GETALLTIMEDATA
} = ApiConfig;


const TimeInOutStore = create((set) => ({
    timedIn: null,
    timeInHour: null,
    timeData: [],
    allTimeData: [],
    timeInLoading: false,
    loading: false,

    getData: async (userid) => {
        set({timeInLoading: true});
        try {
            const response = await axiosInstance.get(GETDATATIME.replace(':userId', userid));
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
            const {checkAuth, AuthUser} = AuthStore.getState();
            console.log(AuthUser.branchLocation);
            set({timeInHour: time});
            set({timedIn: true});
            console.log(AuthUser);

            if (AuthUser.branchLocation === 'N/A') {
                return toast.error('You are not currently in a branch! Contact management.');
            }
            //const fullName = `${AuthUser.firstName} ${AuthUser.middleName} ${AuthUser.lastName}`;

            // const json = {
            //     employeeName: fullName,
            //     date: date,
            //     clockIn: time
            // }

            //localStorage.setItem('timein', JSON.stringify(json));
            console.log(AuthUser);
            const timein = await axiosInstance.post(TIMEIN, {time});
            const activeBranch = await axiosInstance.post(SETBRANCHACTIVE.replace(':location', AuthUser.branchLocation), AuthUser);
            await checkAuth();
            console.log(activeBranch.data);
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
            const activeBranch = await axiosInstance.post(SETBRANCHOFFLINE.replace(':location', AuthUser.branchLocation), AuthUser);
            console.log(activeBranch);
            await checkAuth();
            const {data} = timeout.data;

            const updatedData = {
                employeeName: fullName,
                userId: data.userId,
                date: date,
                clockIn: AuthUser.time,
                clockOut: time,
                totalHours: data.totalHours
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
    },

    getAllData: async () => {
        try {
            set({timeInLoading: true});
            const response = await axiosInstance.get(GETALLTIMEDATA);
            const data = response.data.data;
            const cleanedData = data.map(({_id, date, clockIn, clockOut, createdAt, updatedAt, __v, ...rest}) => rest);
            set({allTimeData: cleanedData});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.message);
            }
        } finally {
            set({timeInLoading: false});
        }
    }

}));

export default TimeInOutStore;