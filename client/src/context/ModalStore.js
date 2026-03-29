import { create } from "zustand";

const ModalStore = create((set) => ({
    isOpen: false,
    confirmModal: false,
    yesNoModal: false,
    deleteModal: false,
    showAddModal: false,
    selectedItems: [],
    selectedItem: null,
    url: "",
    
    setYesNoModal: (val) => set({yesNoModal: val}),
    setSelectedItem: (item) => set({selectedItem: item}),
    setShowAddModal: (val) => set({showAddModal: val}),
    setUrl: (url) => set({url: url}),
    setConfirmModal: (val) => set({confirmModal: val}), 
    setModal: (val) => set({ isOpen: val }),
    setSelectedItems: (items) => set({selectedItems: items}),
    setDeleteModal: (val) => set({deleteModal: val})
}));

export default ModalStore;



