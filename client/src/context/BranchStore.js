import { create } from "zustand";
import ApiConfig from "../Api/ApiConfig";
import toast from "react-hot-toast";
import axiosError from "../helpers/axiosError";
import axiosInstance from "../helpers/axiosInstance";

const {
    ADDBRANCH,
    GETBRANCHES,
    GETBRANCHBYLOCATION
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
    selectedUsersToAdd: [],
    selectedBranchView: null,

    setSelectedBranchView: (data) => set({selectedBranchView: data}),

    setBranchInput: (name, val) => {
        set((state) => ({
            input: { ...state.input, [name]: val }
        }));
    },

    setSelectedUsers: (updater) => set((state) => ({
        selectedUsersToAdd: typeof updater === 'function' 
            ? updater(state.selectedUsersToAdd) 
            : updater
    })),

    setShowModal: (val) => set({showModalBranch: val}),

    newBranch: async (selectedUsers) => {
        try {
            const data = get().input;
            console.log(data);
            const newBranch = await axiosInstance.post(ADDBRANCH, {location: data.location, clerks: selectedUsers});
            const newBranchData = newBranch.data.data;

            const newData = {
                clerks: selectedUsers,
                location: newBranchData.location,
                role: newBranchData.role,
                session: newBranchData.session,
                active: newBranchData.active
            }
            set((state) => ({branches: [newData, ...state.branches]}));
            set({showModalBranch: false});
            toast.success(`Branch ${newBranchData.location} added!`);
        } catch (error) {
            console.log(error);
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
        }
    },

    getBranch: async () => {
        try {
            const branches = await axiosInstance.get(GETBRANCHES);
            const data = branches.data.data;
            set({branches: data});
        } catch (error) {
            //toast.error(error.message);
            console.log(error.message);
        }
    },

    getBranchByLocation: async (location) => {
        try {
            const branch = await axiosInstance.get(GETBRANCHBYLOCATION.replace(':location', location));
            const data = branch.data.data;
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
}));

export default BranchStore;