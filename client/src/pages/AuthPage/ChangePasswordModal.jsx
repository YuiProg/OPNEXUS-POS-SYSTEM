import React from "react";
import { Modal } from "../../TRModal/Modal";
import { InputForm, InputRow, TRInputFormPanel } from "../../components/TRInputForm/TRInputForm";
import AuthStore from "../../context/Authstore";
import InputField from "../../components/TRInputField/InputFIeld";

const viewChangePasswordModal = () => {
    const { setChangePasswordModal, setChangePasswordInput, changePassword, changePasswordLoading } = AuthStore.getState();
     const handleClose = () => {
        setChangePasswordModal(false);
    };

    const changeUserPassword = (e) => {
        e.preventDefault();   
        changePassword();
    }
    return (
        <Modal onClose={handleClose} header="Change Password" subHeader="Enter your current password and new password to change your password.">
            <InputForm onSubmit={(e) => changeUserPassword(e)} btnDisabled={changePasswordLoading}>
                <InputRow titles={['Current Password']}>
                    <InputField password placeholder="Current Password" onChange={(e) => setChangePasswordInput('currentPassword', e)} required/>
                </InputRow>
                <InputRow titles={['New Password']}>
                    <InputField password placeholder="New Password" onChange={(e) => setChangePasswordInput('newPassword', e)} required/>
                </InputRow>
                <InputRow titles={['Confirm New Password']}>
                    <InputField password placeholder="Confirm New Password" onChange={(e) => setChangePasswordInput('confirmPassword', e)} required/>
                </InputRow>
            </InputForm>
        </Modal>
    );
}

export default viewChangePasswordModal;