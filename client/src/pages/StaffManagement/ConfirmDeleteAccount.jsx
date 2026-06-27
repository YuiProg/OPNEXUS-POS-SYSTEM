import React from "react";
import { Modal } from "../../TRModal/Modal";
import ModalStore from "../../context/ModalStore";
import { Table } from "../../components/TRTable/TrTable";
import { InputForm } from "../../components/TRInputForm/TRInputForm";
import AuthStore from "../../context/Authstore";

const confirmDeleteAccountModal = () => {
    const { selectedItem, setShowAccountLockedModalDelete } = ModalStore.getState();
    const { deleteMultipleUsers } = AuthStore.getState();

    const onSubmit = (e) => {
        e.preventDefault();
        deleteMultipleUsers(selectedItem);
    }

    return (
        <Modal 
            onClose={() => setShowAccountLockedModalDelete(false)}
            header="Delete Accounts"
        >
            <InputForm onSubmit={e => onSubmit(e)}>
                <Table data={selectedItem}/>
            </InputForm>
        </Modal>
    );
}

export default confirmDeleteAccountModal;

