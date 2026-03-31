import { create } from "zustand";
import ApiConfig from "../Api/ApiConfig";

const BranchStore = create((set) => ({
    branches: [],
    errorBranch: null,
    showModalBranch: false,
    input: {
        location: '',
        session: '',
        isActive: false,
        clerk: null
    },

    setShowModal: (val) => set({showModalBranch: val}),

    newBranch: async (data) => {
        try {
            
        } catch (error) {
            
        }
    },

    getBranch: async () => {
        try {
            
        } catch (error) {
            
        }
    }
}));

export default BranchStore;