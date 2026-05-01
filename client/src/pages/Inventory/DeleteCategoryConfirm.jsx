import React from "react";
import { ModalYesNo } from "../../TRModal/Modal";
import ModalStore from "../../context/ModalStore";
import CategoryStore from "../../context/CategoryStore";

const deleteCategoryConfirm = () => {
    const { selectedItem, setShowConfirmDeleteCategory } = ModalStore.getState();
    const { deleteCategory } = CategoryStore.getState();

    
    return (
        <ModalYesNo 
            message={`Delete Category ${selectedItem.categoryName}?`} 
            message2="This will the selected Category" 
            onClose={() => setShowConfirmDeleteCategory(false)}
            onYes={() => deleteCategory()}
            />
    );
}

export default deleteCategoryConfirm;