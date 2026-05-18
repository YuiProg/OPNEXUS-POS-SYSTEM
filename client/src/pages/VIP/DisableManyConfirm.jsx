import React from "react";
import { Modal } from "../../TRModal/Modal";
import ModalStore from "../../context/ModalStore";
import { Table } from "../../components/TRTable/TrTable";
import { InputForm } from "../../components/TRInputForm/TRInputForm";
import VipStore from "../../context/VipStore";


const disableManyConfirmModal = () => {

    const { setShowVipDisableManyConfirm, selectedItem } = ModalStore.getState();
    const { disableManyVip } = VipStore.getState();

    const ids = selectedItem.map(d => d.vipId);

    const disableMany = (e) => {
        e.preventDefault();
        setShowVipDisableManyConfirm(false);
        disableManyVip(ids);
    }

    return (
        <Modal header="You are about to disable the following VIP/s" onClose={() => setShowVipDisableManyConfirm(false)}>
            <InputForm onSubmit={(e) => disableMany(e)}>
                <Table data={selectedItem}/>
            </InputForm>
        </Modal>
    );
}

export default disableManyConfirmModal;