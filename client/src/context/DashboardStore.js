import { create } from "zustand";
import axiosError from "../helpers/axiosError";
import toast from "react-hot-toast";
import ApiConfig from "../Api/ApiConfig";
import axiosInstance from "../helpers/axiosInstance";
import BranchStore from "./BranchStore";
import AuthStore from "./Authstore";

const {
    GETMONTHLYSALES,
    GETTODAYSALES,
    GETNETPROFIT,
    GETTOPPRODUCTS
} = ApiConfig;

const DashboardStore = create((set) => ({
    monthlySales: null,
    todaySales: null,
    netProfit: null,
    topProducts: null,
    statsLoading: false,
    todayLoading: false,

    getMonthlySales: async () => {
        const { selectedBranch } = AuthStore.getState();

        set({statsLoading: true});
        try {
            const sales = await axiosInstance.get(GETMONTHLYSALES.replace(':branch', selectedBranch));
            set({monthlySales: sales.data});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        } finally {
            set({statsLoading: false});
        }
    },

    getTodaysSales: async () => {
        set({todayLoading: true});
        const { selectedBranch } = AuthStore.getState();
        const branch = selectedBranch || 'any';
        try {
            const todayStats = await axiosInstance.get(GETTODAYSALES.replace(':branch', branch));
            set({todaySales: todayStats.data});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        } finally {
            set({todayLoading: false});
        }
    },

    getNetProfit: async () => {
        try {
            const {selectedBranch} = AuthStore.getState();
            const netProfit = await axiosInstance.get(GETNETPROFIT.replace(':branch', selectedBranch));
            set({netProfit: netProfit.data});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        }
    },

    getTopProducts: async () => {
        try {
            const { selectedBranch } = AuthStore.getState();
            const topproducts = await axiosInstance.get(GETTOPPRODUCTS.replace(':branch', selectedBranch));
            set({topProducts: topproducts.data});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        }
    }
}));

export default DashboardStore;