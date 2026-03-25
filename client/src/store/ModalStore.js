import { create } from "zustand";

const ModalStore = create((set) => ({
    isOpen: false,

    setModal: (val) => set({ isOpen: val }),
}));

export default ModalStore;