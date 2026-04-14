import { create } from "zustand";
import ApiConfig from "../Api/ApiConfig";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";
import ModalStore from "./ModalStore";
import axiosError from "../helpers/axiosError";

const {
    ADDVIP,
    GETALLVIP,
    USEVIPCARD
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
    editVipModal: false,

    setEditVipModal: (val) => set({editVipModal: val}),

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
            set((state) => ({vips: [newVip.data.data, ...state.vips]}));
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
            console.log(error.message);
            isScreenLoading(false);
        } finally {
            set({vipLoading: false});
            setShowVipModal(false);
            isScreenLoading(false);
            get().resetInputs();
        }
    },

    getVipById: async (id) => {
        const { setSelectedItem } = ModalStore.getState();
        try {
            const vipData = await axiosInstance.get(USEVIPCARD.replace(':id', id));
            setSelectedItem(vipData.data.data[0]);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
            console.log(error.message);
        }
    },

    getVips: async () => {
        set({vipLoading: true});
        try {
            const vips = await axiosInstance.get(GETALLVIP);
            const data = vips.data.data;
            const tableData = data.map((data) => ({
                vipId: data._id,
                name: data.firstName,
                email: data.email,
                contactNo: data.contactNo,
                status: data.status,
                points: data.points
            }));
            set({vips: tableData});
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
            console.log(error.message);
        } finally { 
            set({vipLoading: false});
        }
    }
}));

export default VipStore;