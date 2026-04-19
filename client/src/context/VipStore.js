import { create } from "zustand";
import ApiConfig from "../Api/ApiConfig";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";
import ModalStore from "./ModalStore";
import axiosError from "../helpers/axiosError";

const {
    ADDVIP,
    GETALLVIP,
    USEVIPCARD,
    UPDATEVIP,
    DELETEVIP,
    DISABLEMANYVIP
} = ApiConfig;

const VipStore = create((set, get) => ({
    vips: [],
    inputs: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        contactNo: null,
        points: 0,
        isActive: 'ACTIVE'
    },
    vipLoading: false,
    editVipModal: false,
    activeDiscount: null,
    vipChanges: null,
    yesNoConfirmDelete: false,

    setYesNoConfirmDelete: (val) => set({yesNoConfirmDelete: val}),

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
            get().getVips();
        }
    },

    deleteVip: async (id) => {
        try {
            const deleted = await axiosInstance.post(DELETEVIP.replace(':id', id));
            toast.success(deleted.data.status);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        } finally {
            set({yesNoConfirmDelete: false});
            get().getVips();
        }
    },

    disableManyVip: async (list) => {
        try {
            const update = await axiosInstance.post(DISABLEMANYVIP, list);
            console.log(update);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        } finally {
            get().getVips();
        }
    },

    updateVip: async () => {
        const { isScreenLoading, selectedItem, setShowVipChangesModal } = ModalStore.getState();
        const {firstName, middleName, lastName, email, contactNo, points, isActive} = get().inputs;
        try {
            isScreenLoading(true);
            const payload = {
                firstName: firstName || selectedItem.firstName,
                middleName: middleName || selectedItem.middleName,
                lastName: lastName || selectedItem.lastName,
                email: email || selectedItem.email,
                contactNo: contactNo || selectedItem.contactNo,
                points: points || selectedItem.points,
                status: isActive || selectedItem.isActive
            }
            const updatedVIP = await axiosInstance.post(UPDATEVIP.replace(':id', selectedItem._id), payload);
            set({vipChanges: updatedVIP.data});
            set({editVipModal: false});
            toast.success(updatedVIP.data.status);
            setShowVipChangesModal(true);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
            console.log(error.message);
            isScreenLoading(false);
        } finally {
            isScreenLoading(false);
            get().resetInputs();
            await get().getVips();
        }
    },

    getVipById: async (id) => {
        const { setSelectedItem } = ModalStore.getState();
        try {
            const vipData = await axiosInstance.get(USEVIPCARD.replace(':id', id));
            setSelectedItem(vipData.data.data[0]);
            set({activeDiscount: vipData.data.data[0]});
            return vipData.data.data[0];
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