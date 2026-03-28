import React from "react";
import './StaffManagement.css'
import { InputForm, InputRow, TRInputFormPanel } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import DropDown from "../../components/TRDropDown/Dropdown";
import Button from "../../components/TRButton/Button";
import { Table } from "../../components/TRTable/TrTable";
import BranchStore from "../../context/BranchStore";
import { Modal } from "../../TRModal/Modal";
import AuthStore from "../../context/Authstore";
import ModalStore from "../../context/ModalStore";
import ProductStore from "../../context/ProductStore";

class StaffManagement extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount () {
        const {fetchUsers} = AuthStore.getState();
        fetchUsers();
        this.unsubscribe = AuthStore.subscribe((state) => {
            const users = state.users;
            this.setState({users: users});
        });
    }

    showConfirmDelModal = (e) => {
        const { setDeleteModal, setSelectedItems, setUrl } = ModalStore.getState();
        setDeleteModal(true);
        setSelectedItems(e);
        setUrl("staff");
    }


    render () {
        const {setShowModal} = BranchStore.getState();

        const tableData = {
            header: "STAFFS",
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
            hasDelete: true,
            deleteBtnInfo: 'Delete',
            CBD: (e) => this.showConfirmDelModal(e)
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
            <div className="sm-container">
                <div className="sm-top-contents">
                    <div className="sm-header">
                        <h1 className="sm-bigtitle">Staff Management</h1>
                        <p className="sm-sentence">Manage clerks.</p>
                    </div>
                    <div className="sm-branch-dropdown">
                        <p className="sm-branch-text">Branch</p>
                        <DropDown className="sm-branch-dd"/>
                    </div>
                </div>
                <Table 
                    data={this.state.users} 
                    isDetailed={tableData}
                    hasSelect
                    hasAction
                    onDelete={() => {}}
                    onEdit={() => {}}/>
            </div>
            </>
        );
    }
}

export default StaffManagement;