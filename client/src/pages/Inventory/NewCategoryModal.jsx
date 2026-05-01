import React from "react";
import { Modal } from "../../TRModal/Modal";
import ProductStore from "../../context/ProductStore";
import ModalStore from "../../context/ModalStore";
import { InputForm, InputRow } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import { Table } from "../../components/TRTable/TrTable";
import CategoryStore from "../../context/CategoryStore";

const newCategoryModal = () => {
    const { setCategoryName, addCategory, categLoading, categories } = CategoryStore.getState();
    const { setShowNewCategoryModal, setSelectedItem, setShowConfirmDeleteCategory } = ModalStore.getState();
    
    const newCateg = (e) => {
        e.preventDefault();
        addCategory();
    }

    const showDeleteConfirm = (e) => {
        setSelectedItem(e);
        setShowConfirmDeleteCategory(true);
    }

    return (
        <Modal loading={categLoading} onClose={() => setShowNewCategoryModal(false)} header="Category" subHeader="View, add and remove categories" hasCancel>
            <InputForm onSubmit={(e) => newCateg(e)}>
                <InputRow titles={['Add category']}>
                    <InputField text placeholder="Add category name" onChange={e => setCategoryName(e)} required/>
                </InputRow>
                <InputRow titles={['View and modify categories']}>
                    <Table data={categories} limit={5} hasAction noEdit={true} onDelete={(e) => showDeleteConfirm(e)}/>
                </InputRow>
            </InputForm>
        </Modal>
    );
}

export default newCategoryModal;