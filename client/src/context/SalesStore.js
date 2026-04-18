import { create } from "zustand";
import AuthStore from "./Authstore";
import ApiConfig from "../Api/ApiConfig";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";
import ProductStore from "./ProductStore";
import BranchStore from "./BranchStore";
import ModalStore from "./ModalStore";
import axiosError from "../helpers/axiosError";

const {
    NEWSALE,
    GETSALES,
    GETSINGLERECORD
} = ApiConfig;
/* eslint-disable no-unused-vars */
const SalesStore = create((set) => ({
    salesForTable: [],
    saleLoading: false,
    cleanedData: [],
    salesModal: false,
    singleData: null,
    singleDataUnCleaned: null,
    loading: false,
    transactRefNo: null,

    setSalesModal: (val) => set({salesModal: val}),

    processOrder: async (data) => {
        set({saleLoading: true});
        const {AuthUser} = AuthStore.getState();
        const { fetchProducts } = ProductStore.getState();
        const {setTransactConfirmModal} = ModalStore.getState();
        const {subtotal, change, items, amountPaid} = data;
        const now = new Date();
        const totalCartQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
        const dateTime = now.toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }).replace(",", "");
        console.log(data);

        const payload = {
            clerkName: AuthUser.username,
            clerkId: AuthUser._id,
            amountPaid: amountPaid,
            itemSold: totalCartQuantity,
            items: items,
            vip: data.vip,
            purchasedBy: data.purchasedBy,
            discountAmount: data.discountAmount,
            usedDiscount: data.usedDiscount,
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
            const refNo = newSale.data.data.newSale;
            set({transactRefNo: refNo._id});
            toast.success('Order Success.');
            setTransactConfirmModal(true);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
            console.log(error);
        } finally {
            set({saleLoading: false});
            await fetchProducts(true, AuthUser.branchLocation);
        }
    },

    fetchSingleSale: async (id) => {
        //set({ loading: true });
        set({singleDataUnCleaned: null, loading: true});
        try {
            const result = await axiosInstance.get(GETSINGLERECORD.replace(':id', id));
            const record = result.data.data[0];
            const items = record?.items;

            if (!items || items.length === 0) {
                set({ singleData: [], singleDataUnCleaned: record });
                return;
            }

            const cleanedItems = items.map(({
                _id,
                Creator,
                createdById,
                creatorName,
                productImage,
                productImageId,
                productName,
                updatedAt,
                __v,
                createdAt,
                productBranch,
                ...rest
            }) => rest);

            //set({ singleData: cleanedItems });
            set({ singleDataUnCleaned: record, singleData: cleanedItems }); 
        } catch (error) {
            console.log(error);
        } finally {
            set({ loading: false });
        }
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
                vip: rest.vip,
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