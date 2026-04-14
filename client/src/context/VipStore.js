import { create } from "zustand";
import ApiConfig from "../Api/ApiConfig";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";
import ModalStore from "./ModalStore";
import axiosError from "../helpers/axiosError";

const {
    ADDVIP
} = ApiConfig;

const VipStore = create((set, get) => ({
    vips: [],
    inputs: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        contactNo: null,
        points: 0
    },
    vipLoading: false,

    setInputs: (name, value) => {
        const inputs = get().inputs;
        inputs[name] = value;
        set({inputs: inputs});
    },

    resetInputs: () => {
        set({inputs: {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            contactNo: null,
            points: 0
        }});
    },

    addVip: async () => {
        const { setShowVipModal, isScreenLoading } = ModalStore.getState();
        set({vipLoading: true});
        const input = get().inputs;
        try {
            isScreenLoading(true);
            const newVip = await axiosInstance.post(ADDVIP, input);
            toast.success(newVip.data.status);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
            console.log(error.message);
            isScreenLoading(false);
        } finally {
            set({vipLoading: true});
            setShowVipModal(false);
            isScreenLoading(false);
            get().resetInputs();
        }
    },

    // getVips: async () => {
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }
}));

export default VipStore;