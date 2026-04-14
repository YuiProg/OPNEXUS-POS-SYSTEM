import React from "react";
import { Modal } from "../../TRModal/Modal";
import VipStore from "../../context/VipStore";
import ModalStore from "../../context/ModalStore";
import { InputForm, InputRow } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";


const disableManyVipModal = () => {
    const { setEditVipModal } = VipStore.getState();
    const { selectedItem } = ModalStore.getState();
    
    if (!selectedItem) return;
    console.log(selectedItem);
    return(
        <Modal onClose={() => setEditVipModal(false)} header={`Edit ${selectedItem.firstName} VIP details`}>
            <InputForm>
                <InputRow gap={16} titles={['First Name', 'Middle Name', 'Last Name']}>
                    <InputField text placeholder="First Name" value={selectedItem.firstName} onChange={() => {}} required/>
                    <InputField text placeholder="First Name" value={selectedItem.middleName} onChange={() => {}} required/>
                    <InputField text placeholder="First Name" value={selectedItem.lastName} onChange={() => {}} required/>
                </InputRow>
                <InputRow gap={16} titles={['Email', 'Contact No', 'Points']}>
                    <InputField text placeholder="Email" value={selectedItem.email} onChange={() => {}} required/>
                    <InputField text placeholder="(+63)" value={selectedItem.contactNo} onChange={() => {}} required/>
                    <InputField text placeholder="Default is 0" value={selectedItem.points} onChange={() => {}} required/>
                </InputRow>
                <InputRow>
                    {/* REX DITO MO LAGAY YUNG TOGGLE BUTTON TAS ACTIVE OR INACTIVE */}
                </InputRow>
            </InputForm>
        </Modal>
    );
}

export default disableManyVipModal;