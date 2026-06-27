import React from "react";
import { PanelPage, RightPanel } from "../../components/TRPanelPage/TRPanelPage";
import AuthStore from "../../context/Authstore";
import BranchStore from "../../context/BranchStore";
import { Table } from "../../components/TRTable/TrTable";
import { InputForm, InputRow } from "../../components/TRInputForm/TRInputForm";
import InputField from "../../components/TRInputField/InputFIeld";
import DropdownPortal from "../../components/TRDropDown/Dropdown";
import ModalStore from "../../context/ModalStore";

class LockedStaffs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lockedAccounts: [],
            selectedAccounts: null,
            filtersOpen: false
        }
    }

    componentDidMount() {
        const { getBranch } = BranchStore.getState();
        const { fetchLockedAccounts } = AuthStore.getState();
        fetchLockedAccounts();
        getBranch();

        this.unsubscribe = AuthStore.subscribe((state) => {
            this.setState({lockedAccounts: state.lockedAccounts.data?.tabledata});
        });
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
                        <DropdownPortal
                        placeholder="Select Branch"
                        options={branchNames}
                        />
                    </InputRow>
                </InputForm>
            </RightPanel>
        );
    }

    showAccountLockedModal = () => {
        const {setSelectedItem, setShowAccountLockedModal} = ModalStore.getState();
        if (!this.state.selectedAccounts || this.state.selectedAccounts.length === 0) return;
        setSelectedItem(this.state.selectedAccounts);
        setShowAccountLockedModal(true);
    }

    showAccountLockedModalDelete = () => {
        const {setSelectedItem, setShowAccountLockedModalDelete} = ModalStore.getState();
        if (!this.state.selectedAccounts || this.state.selectedAccounts.length === 0) return;
        setSelectedItem(this.state.selectedAccounts);
        setShowAccountLockedModalDelete(true);
    }

    render () {

        const {setSelectedBranch, selectedBranch} = AuthStore.getState();
        const { branches } = BranchStore.getState();
        const { fetchLoading } = AuthStore.getState();
        
        const branchNames = branches.map(d=>d.location);
        return (
            <PanelPage 
                titlePage="Locked staffs" 
                subTitle="manage locked staffs or accounts"
                user={this.props.user}
                branchNames={branchNames}
                hasBranch
                dropDownFunc={(e) => setSelectedBranch(e)}
                selectedBranch={selectedBranch}
                hasStepper
                rightPanel={this.rightSideTableFilter()}
                onFilterToggle={(val) => this.setState({filtersOpen: val})}
                filtersOpen={this.state.filtersOpen}
                hasTableFilters={true}
                nextButtonLabel="UNLOCK ACCOUNT"
                backButtonLabel="DELETE ACCOUNT"
                onClickNext={() => this.showAccountLockedModal()}
                onClickBack={() => this.showAccountLockedModalDelete()}
            >
                <Table 
                    data={this.state.lockedAccounts || []} 
                    isLoading={fetchLoading}
                    hasSelect
                    isDetailed={{header: 'Locked Accounts'}}
                    selectedItems={e => this.setState({selectedAccounts: e})}
                />
                {this.state.filtersOpen && this.rightSideTableFilter()}
            </PanelPage>
        );
    }
}

export default LockedStaffs;