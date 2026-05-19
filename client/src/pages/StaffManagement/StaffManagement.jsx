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
import ActiveStaffs from "./ActiveStaffs/ActiveStaffs";
import toast from "react-hot-toast";
import { PanelPage, RightPanel } from "../../components/TRPanelPage/TRPanelPage";
import { Link } from "react-router-dom";

class StaffManagement extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            users: [],
            filtersOpen: false,
        }
    }

    componentDidMount () {
        const {fetchUsers} = AuthStore.getState();
        const { getBranch } = BranchStore.getState();
        fetchUsers();
        getBranch();
        this.unsubscribe = AuthStore.subscribe((state) => {
            const users = state.users;
            this.setState({users: users});
        });
    }

    componentWillUnmount () {
        if (this.unsubscribe) this.unsubscribe;
    }

    showConfirmDelModal = (e) => {
        const { setDeleteModal, setSelectedItems, setUrl } = ModalStore.getState();
        setDeleteModal(true);
        setSelectedItems(e);
        setUrl("staff");
    }

    showDeleteModal = (item) => {
        const {setSelectedItem, setYesNoModal, setUrl} = ModalStore.getState();
        setSelectedItem(item);
        setYesNoModal(true);
        setUrl("staff");
    }

    showEditModal = async (item) => {
        const { setEditUserModal, setSelectedItem, setUrl } = ModalStore.getState();
        const { getSingleUser } = AuthStore.getState();
        try {
            const user = await getSingleUser(item.Id);
            setSelectedItem(user.data);
            setEditUserModal(true);
            setUrl('staff');
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    rightSideTableFilter = () => {
        const { branches } = BranchStore.getState();
        const branchNames = branches.map(d => d.location);
        return (
            <RightPanel>
                <InputForm>
                    <InputRow titles={['Staff ID']}>
                        <InputField
                        placeholder="Search Staff ID"
                        isSearch
                        />
                    </InputRow>
                    <InputRow titles={['Name']}>
                        <InputField
                        placeholder="Search Name"
                        isSearch
                        />
                    </InputRow>
                    <InputRow titles={['Filter by branch']}>
                        <DropDown
                        placeholder="Select Branch"
                        options={branchNames}
                        />
                    </InputRow>
                </InputForm>
            </RightPanel>
        );
    }

    render () {
        //const {setShowModal} = BranchStore.getState();
        const { setShowAddModal } = ModalStore.getState();
        const { onlineUsers, fetchLoading } = AuthStore.getState();
        const {setSelectedBranch, selectedBranch} = AuthStore.getState();
        const { branches } = BranchStore.getState();

        const branchNames = branches.map(d=>d.location);

        const tableData = {
            header: "STAFFS",
            hasButton: true,
            CB: () => setShowAddModal(true),
            buttonInfo: "NEW CLERK",
            hasDelete: true,
            deleteBtnInfo: 'Delete',
            CBD: (e) => this.showConfirmDelModal(e)
        };
        
        return (
            <PanelPage 
                user={this.props.user} 
                titlePage="Staff Management" 
                subTitle="Manage clerks." 
                hasBranch={true} 
                branchNames={branchNames}
                dropDownFunc={(e) => setSelectedBranch(e)}
                selectedBranch={selectedBranch}
                rightPanel={this.rightSideTableFilter()}
            >
                <div className="sm-main-contents">
                    <div className="sm-table">
                        <Table 
                            data={this.state.users} 
                            isDetailed={tableData}
                            hasSelect
                            hasAction
                            onDelete={(e) => this.showDeleteModal(e)}
                            onEdit={(item) => this.showEditModal(item)}
                            isLoading={fetchLoading}
                            hasTableFilters={true}
                            onFilterToggle={(isOpen) => this.setState({filtersOpen: isOpen})}
                        />
                    </div>
                    {this.state.filtersOpen && this.rightSideTableFilter()}
                    <div className="sm-active-staffs">
                        <ActiveStaffs staffData={onlineUsers}/>
                    </div>
                </div>
                <Link to="/addstaff">TEST</Link>
            </PanelPage>
        );
    }
}

export default StaffManagement;