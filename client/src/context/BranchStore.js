import { create } from "zustand";
import ApiConfig from "../Api/ApiConfig";
import toast from "react-hot-toast";
import axiosError from "../helpers/axiosError";
import axiosInstance from "../helpers/axiosInstance";

const {
    ADDBRANCH,
    GETBRANCHES
} = ApiConfig;

const BranchStore = create((set, get) => ({
    branches: [],
    errorBranch: null,
    showModalBranch: false,
    input: {
        location: '',
        clerk: null
    },
    selectedBranch: "Branch",

    setBranchInput: (name, val) => {
        const inputs = get().input;
        inputs[name] = val;
        set({input: inputs});
    },

    setShowModal: (val) => set({showModalBranch: val}),

    newBranch: async () => {
        try {
            const data = get().input;
            const newBranch = await axiosInstance.post(ADDBRANCH, data);
            const newBranchData = newBranch.data.data;
            //console.log(newBranchData);
            const newData = {
                clerkname: newBranchData.clerkName,
                location: newBranchData.location,
                role: newBranchData.role,
                session: newBranchData.session,
                active: newBranchData.active
            }
            set((state) => ({branches: [newData, ...state.branches]}));
            set({showModalBranch: false});
            toast.success(`Branch ${newBranchData.location} added!`);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
            set({errorUser: axiosError(error)});
        }
    },

    getBranch: async () => {
        try {
            const branches = await axiosInstance.get(GETBRANCHES);
            const data = branches.data.data;
            set({branches: data});
        } catch (error) {
            //toast.error(error.message);
            set({errorUser: axiosError(error)});
        }
    }
}));

export default BranchStore;