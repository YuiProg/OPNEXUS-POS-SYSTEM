import React from "react";
import { Modal } from "../../TRModal/Modal";
import ModalStore from "../../context/ModalStore";
import { InputForm, InputRow } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import VipStore from "../../context/VipStore";

const addVipUser = () => {

    const { setShowVipModal } = ModalStore.getState();
    const { addVip, setInputs } = VipStore.getState();

    const handleSubmit = (e) => {
        e.preventDefault();
        addVip();
    }

    return (
        <Modal onClose={() => setShowVipModal(false)} header="Add vip" subHeader="Add new vip for discounts etc.">
            <InputForm onSubmit={(e) => handleSubmit(e)}>
                <InputRow gap={15} titles={['First Name', 'Middle Name', 'Last Name']}>
                    <InputField text placeholder="Enter First Name" onChange={value => setInputs('firstName', value)} required/>
                    <InputField text placeholder="Enter Middle Name" onChange={value => setInputs('middleName', value)}/>
                    <InputField text placeholder="Enter Last Name" onChange={value => setInputs('lastName', value)} required/>
                </InputRow>
                <InputRow titles={['Email', 'Contact No.', 'Points']} gap={15}>
                    <InputField email placeholder="Enter Email" onChange={value => setInputs('email', value.toLowerCase())} required/>
                    <InputField number placeholder="(+63)" onChange={value => setInputs('contactNo', Number(value))}/>
                    <InputField number placeholder="Default is 0" onChange={value => setInputs('points', Number(value))}/>
                </InputRow>
            </InputForm>
        </Modal>
    );
}

export default addVipUser;