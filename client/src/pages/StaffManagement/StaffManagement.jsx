import React from "react";
import { InputForm, InputRow, TRInputFormPanel } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import DropDown from "../../components/TRDropDown/Dropdown";
import Button from "../../components/TRButton/Button";

class StaffManagement extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <TRInputFormPanel 
                required 
                header="ADD NEW EMPLOYEE" 
                subHeader="test subheader" 
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log('test');
                }}
            >
                <InputForm>
                    <InputRow gap={16} titles={['title1', 'title2']}>
                        <InputField text placeholder="test"/>
                        <InputField text/>
                    </InputRow>
                    <InputRow gap={16} titles={['title3', 'title4']}>
                        <InputField text/>
                        <InputField text/>
                    </InputRow>
                    <InputRow gap={16} titles={['title6', 'title7']}>
                        <InputField text/>
                        <DropDown maxWidth/>
                    </InputRow>
                </InputForm>
            </TRInputFormPanel>
            //<Button success text="+ Add Stock" onClick={() => console.log('test')}/>
        );
    }
}

export default StaffManagement;