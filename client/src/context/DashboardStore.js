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
    GETTOPPRODUCTS,
    GETTODAYSREVENUE
} = ApiConfig;

const DashboardStore = create((set) => ({
    monthlySales: null,
    todaySales: null,
    netProfit: null,
    todayRevenue: null,
    topProducts: null,
    todayRevenueLoading: false,
    statsLoading: false,
    todayLoading: false,
    netProfitLoading: false,
    topProductsLoading: true,

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
        set({netProfitLoading: true});
        try {
            const {selectedBranch} = AuthStore.getState();
            const netProfit = await axiosInstance.get(GETNETPROFIT.replace(':branch', selectedBranch));
            set({netProfit: netProfit.data});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        } finally {
            set({netProfitLoading: false});
        }
    },

    getTopProducts: async () => {
        set({topProductsLoading: true});
        try {
            const { selectedBranch } = AuthStore.getState();
            const topproducts = await axiosInstance.get(GETTOPPRODUCTS.replace(':branch', selectedBranch));
            set({topProducts: topproducts.data});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        } finally {
            set({topProductsLoading: false});
        }
    },

    getTodayRevenue: async () => {
        try {
            set({todayRevenueLoading: true});
            const { selectedBranch } = AuthStore.getState();
            const todayRevenue = await axiosInstance.get(GETTODAYSREVENUE.replace(':branch', selectedBranch));
            set({todayRevenue: todayRevenue.data});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        } finally {
            set({todayRevenueLoading: false});
        }
    }
}));

export default DashboardStore;