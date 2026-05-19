import React from "react";
import { PanelContainer, PanelPage } from "../../components/TRPanelPage/TRPanelPage";
import { InputForm, InputRow } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";

class NewProductPage extends React.Component {
    render () {
        return (
            <PanelPage titlePage="ADD PRODUCTS" subTitle="Add new products here" hasStepper >
                <PanelContainer currentStep={0} totalSteps={3}>
                    <InputRow gap={16} titles={['Product Name', 'Quantity', 'Price']} bottomMargin>
                        <InputField text placeholder='Enter Product Name'/>
                        <InputField text placeholder='Enter Product Quantity'/>
                        <InputField number placeholder='Enter Product Price'/>
                    </InputRow>
                    <InputRow gap={16} titles={['Product Name', 'Quantity', 'Price']}>
                        <InputField text placeholder='Enter Product Name'/>
                        <InputField text placeholder='Enter Product Quantity'/>
                        <InputField number placeholder='Enter Product Price'/>
                    </InputRow>
                </PanelContainer>
            </PanelPage>
        );
    }
}

export default NewProductPage;