import React from "react";
import { Modal } from "../../TRModal/Modal";
import ModalStore from "../../context/ModalStore";
import { Table } from "../../components/TRTable/TrTable";
import { InputForm } from "../../components/TRInputForm/TRInputForm";
import AuthStore from "../../context/Authstore";

const confirmLockedModal = () => {
    const { selectedItem, setShowAccountLockedModal } = ModalStore.getState();
    const { unlockAccounts } = AuthStore.getState();
    const onSubmit = (e) => {
        e.preventDefault();
        unlockAccounts();
    }

    return (
        <Modal 
            onClose={() => setShowAccountLockedModal(false)}
            header="Activate Accounts"
        >
            <InputForm onSubmit={e => onSubmit(e)}>
                <Table data={selectedItem}/>
            </InputForm>
        </Modal>
    );
}

export default confirmLockedModal;

