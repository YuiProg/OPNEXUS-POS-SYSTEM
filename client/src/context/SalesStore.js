import { create } from "zustand";
import AuthStore from "./Authstore";
import ApiConfig from "../Api/ApiConfig";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";
import ProductStore from "./ProductStore";

const {
    NEWSALE
} = ApiConfig;

const SalesStore = create((set) => ({
    sales: [],
    saleLoading: false,

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
            await fetchProducts();
        }
    }
}));

export default SalesStore;