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

    //viewing
    viewProductModal: false,
    setViewProductModal: (val) => set({viewProductModal: val}),
    //view update changes
    changesModal: false,
    setChangesModal: (val) => set({changesModal: val}),

    //edit product
    editProductModal: false,
    setEditProductModal: (val) => set({editProductModal: val}),
    //edit user
    editUserModal: false,
    setEditUserModal: (val) => set({editUserModal: val}),

    //update view item
    updatedItem: null,
    setUpdatedItem: (item) => set({updatedItem: item}),

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



