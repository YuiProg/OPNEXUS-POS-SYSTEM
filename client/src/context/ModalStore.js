import { create } from "zustand";

const ModalStore = create((set) => ({
    isOpen: false,
    confirmModal: false,
    deleteModal: false,
    selectedItems: [],
    url: "",

    setUrl: (url) => set({url: url}),
    setConfirmModal: (val) => set({confirmModal: val}), 
    setModal: (val) => set({ isOpen: val }),
    setSelectedItems: (items) => set({selectedItems: items}),
    setDeleteModal: (val) => set({deleteModal: val})
}));

export default ModalStore;



