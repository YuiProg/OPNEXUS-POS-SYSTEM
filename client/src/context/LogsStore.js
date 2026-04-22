import { create } from "zustand";
import axiosError from "../helpers/axiosError";
import toast from "react-hot-toast";
import AuthStore from "./Authstore";
import ApiConfig from "../Api/ApiConfig";
import axiosInstance from "../helpers/axiosInstance";

const {
    GETLOGS
} = ApiConfig;

const LogStore = create((set) => ({
    logs: [],

    getLogs: async () => {
        try {
            const { selectedBranch } = AuthStore.getState();
            const logs = await axiosInstance.get(GETLOGS.replace(':branch', selectedBranch));

            const formatted = logs.data.data.map(({ _id, user, action, branchLocation, log, createdAt }) => ({
                "LOG ID": _id,
                user,
                action,
                branchLocation,
                log,
                date: new Date(createdAt).toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }),
            }));

            set({ logs: formatted });
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        }
    }
}));

export default LogStore;