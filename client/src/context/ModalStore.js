import { create } from "zustand";

const ModalStore = create((set) => ({
    isOpen: false,
    confirmModal: false,
    deleteModal: false,
    showAddModal: false,
    selectedItems: [],
    url: "",

    setShowAddModal: (val) => set({showAddModal: val}),
    setUrl: (url) => set({url: url}),
    setConfirmModal: (val) => set({confirmModal: val}), 
    setModal: (val) => set({ isOpen: val }),
    setSelectedItems: (items) => set({selectedItems: items}),
    setDeleteModal: (val) => set({deleteModal: val})
}));

export default ModalStore;



