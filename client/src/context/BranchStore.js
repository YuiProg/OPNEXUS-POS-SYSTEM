import { create } from "zustand";
import ApiConfig from "../Api/ApiConfig";
import toast from "react-hot-toast";
import axiosError from "../helpers/axiosError";
import axiosInstance from "../helpers/axiosInstance";
import AuthStore from "./Authstore";

const {
    ADDBRANCH,
    GETBRANCHES,
    GETBRANCHBYLOCATION,
    REMOVEUSERFROMBRANCH
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
    confirmDelete: false,

    setConfirmDelete: (val) => set({confirmDelete: val}),

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
    },

    removeUserFromBranch: async (data) => {
        const { fetchUsers } = AuthStore.getState();
        try {
            const res = await axiosInstance.post(REMOVEUSERFROMBRANCH.replace(':location', get().selectedBranchView.location), data);
            toast.success(res.data.status);
        } catch (error) {
            if (axiosError(error)) {
                toast.error(error.response.data.status);
            }
            console.log(error.message);
        } finally {
            await fetchUsers();
            await get().getBranch();
            
            // update selectedBranchView to remove the deleted clerk
            const updatedBranches = get().branches;
            const updatedBranch = updatedBranches.find(b => b.location === get().selectedBranchView.location);
            if (updatedBranch) {
                set({ selectedBranchView: updatedBranch, confirmDelete: false });
            } else {
                set({ confirmDelete: false });
            }
        }
    }
}));

export default BranchStore;