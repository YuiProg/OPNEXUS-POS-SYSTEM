import { create } from "zustand";

const ModalStore = create((set) => ({
    isOpen: false,
    deleteModal: false,
    selectedItems: [],

    setModal: (val) => set({ isOpen: val }),
    setSelectedItems: (items) => set({selectedItems: items}),
    setDeleteModal: (val) => set({deleteModal: val})
}));

export default ModalStore;



