import React from "react";
import { InputForm, InputRow, TRInputFormPanel } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import DropDown from "../../components/TRDropDown/Dropdown";
import Button from "../../components/TRButton/Button";
import { Table } from "../../components/TRTable/TrTable";
import BranchStore from "../../store/BranchStore";
import { Modal } from "../../TRModal/Modal";

class StaffManagement extends React.Component {
    constructor (props) {
        super(props);
    }


    render () {
        const {showModalBranch, setShowModal} = BranchStore.getState();

        const tableData = {
            header: "CLERKS",
            hasButton: true,
            CB: () => setShowModal(true),
            buttonInfo: "+NEW CLERK",
            search: (
                <InputField
                placeholder="Search clerk"
                isSearch
                onEnterDown={value => console.log(value)}
                />
            ),
        };
        return (
            // <TRInputFormPanel  
            //     header="ADD NEW EMPLOYEE" 
            //     subHeader="test subheader" 
            //     onSubmit={(e) => {
            //         e.preventDefault();
            //         console.log('test');
            //     }}
            //     btnTXT="TEST"
            //     isRequired
            // >
            //     <InputForm>
            //         <InputRow gap={16} titles={['title1', 'title2']}>
            //             <InputField text placeholder="test" onChange={value => console.log(value)}/>
            //             <InputField text onChange={value => console.log(value)}/>
            //         </InputRow>
            //         <InputRow gap={16} titles={['title3', 'title4']}>
            //             <InputField text onChange={value => console.log(value)}/>
            //             <InputField text onChange={value => console.log(value)}/>
            //         </InputRow>
            //         <InputRow gap={16} titles={['title6', 'title7']}>
            //             <InputField text onChange={value => console.log(value)}/>
            //             <DropDown maxWidth/>
            //         </InputRow>
            //     </InputForm>
            // </TRInputFormPanel>
            //<Button success text="+ Add Stock" onClick={() => console.log('test')}/>
            <>
            <div className="staffmanagement-container">
                <div className="branch-top-content">
                    <h1 className="db-bigtitle">Hello, What do you want to today?</h1>
                    <DropDown/>
                </div>
                <Table data={[]} isDetailed={tableData}/>
            </div>
            </>
        );
    }
}

export default StaffManagement;