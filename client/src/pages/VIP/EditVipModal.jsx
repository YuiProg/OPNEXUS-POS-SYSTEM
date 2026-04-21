import React from "react";
import { Modal, ModalYesNo } from "../../TRModal/Modal";
import VipStore from "../../context/VipStore";
import ModalStore from "../../context/ModalStore";
import { InputForm, InputRow } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import Toggle from "../../components/TRToggle/Toggle";


export const editMainVipModal = () => {
    const { setEditVipModal, setInputs, updateVip } = VipStore.getState();
    const { selectedItem, setSelectedItem } = ModalStore.getState();
    
    if (!selectedItem) return;

    const updateVIPUser = (e) => {
        e.preventDefault();
        updateVip();
    }

    const onClose = () => {
        setSelectedItem(null);
        setEditVipModal(false);
    }

    return(
        <Modal onClose={() => onClose()} header={`Edit ${selectedItem.firstName} VIP details`}>
            <InputForm onSubmit={(e) => updateVIPUser(e)}>
                <InputRow gap={16} titles={['First Name', 'Middle Name', 'Last Name']}>
                    <InputField text placeholder="First Name" value={selectedItem.firstName} onChange={(e) => setInputs('firstName', e)} required/>
                    <InputField text placeholder="Middle Name" value={selectedItem.middleName} onChange={(e) => setInputs('middleName', e)}/>
                    <InputField text placeholder="Last Name" value={selectedItem.lastName} onChange={(e) => setInputs('lastName', e)} required/>
                </InputRow>
                <InputRow gap={16} titles={['Email', 'Contact No', 'Points']}>
                    <InputField text placeholder="Email" value={selectedItem.email} onChange={(e) => setInputs('email', e)}/>
                    <InputField number placeholder="(+63)" maxLength={10} value={selectedItem.contactNo} onChange={(e) => setInputs('contactNo', Number(e))}/>
                    <InputField text placeholder="Default is 0" value={selectedItem.points} onChange={(e) => setInputs('points', Number(e))}/>
                </InputRow>
                {selectedItem.qrCode && (
                    <InputRow titles={['QR CODE']}>
                        <img src={selectedItem.qrCode} alt="qrcode" style={{width: '200px'}}/>
                    </InputRow>
                )}
                <InputRow titles={['VIP Status']}>
                    <Toggle currentStatus={selectedItem.status} onToggle={(status) => setInputs('isActive', status)} />
                </InputRow>
            </InputForm>
        </Modal>
    );
}

export const confirmDeleteVip = () => {
    const { selectedItem } = ModalStore.getState();
    const { setYesNoConfirmDelete, deleteVip } = VipStore.getState();
    console.log(selectedItem);
    return (
        <ModalYesNo
            message={`Delete ${selectedItem.name} as vip?`}
            message2={"This cannot be undone!"}
            onClose={() => setYesNoConfirmDelete(false)}
            onYes={() => deleteVip(selectedItem.vipId)}
        />
    );
}
