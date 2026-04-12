import { create } from "zustand";
import AuthStore from "./Authstore";
import ApiConfig from "../Api/ApiConfig";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";
import ProductStore from "./ProductStore";
import BranchStore from "./BranchStore";

const {
    NEWSALE,
    GETSALES
} = ApiConfig;
/* eslint-disable no-unused-vars */
const SalesStore = create((set) => ({
    salesForTable: [],
    saleLoading: false,
    cleanedData: [],
    salesModal: false,

    setSalesModal: (val) => set({sales: val}),

    processOrder: async (data) => {
        set({saleLoading: true});
        const {AuthUser} = AuthStore.getState();
        const { fetchProducts } = ProductStore.getState();
        const {subtotal, change, items, amountPaid} = data;
        const now = new Date();
        const dateTime = now.toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }).replace(",", "");

        const payload = {
            clerkName: AuthUser.username,
            clerkId: AuthUser._id,
            amountPaid: amountPaid,
            itemSold: items.length,
            items: items,
            dateTime: dateTime,  
            total: subtotal,
            branchLocation: AuthUser.branchLocation,
            change
        };

        try {
            const newSale = await axiosInstance.post(NEWSALE, payload);
            if (!newSale) {
                return toast.error('Order Failed.');
            }

            toast.success('Order Success.');
        } catch (error) {
            console.log(error);
        } finally {
            set({saleLoading: false});
            await fetchProducts(true, AuthUser.branchLocation);
        }
    },

    fetchSingleSale: async (id) => {
        
    },

    getSales: async () => {
        const {selectedBranch} = AuthStore.getState();
        set({saleLoading: true});
        try {
            const sales = await axiosInstance.get(GETSALES.replace(':branch', selectedBranch));
            const data = sales.data.data;

            const cleanedData = data.map(({ items, clerkId, __v, ...rest }) => ({
                saleId: rest._id,
                clerkName: rest.clerkName,
                dateAndTime: rest.dateTime,
                branchLocation: rest.branchLocation,
                discount: rest.discount,
                itemSold: rest.itemSold,
                paid: rest.amountPaid,
                total: rest.total
            }));

            set({salesForTable: cleanedData});
        } catch (error) {
            console.log(error);
        } finally {
            set({saleLoading: false});
        }
    }
}));

export default SalesStore;