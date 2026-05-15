import React from "react";
import './VipManagement.css';
import { Table } from "../../components/TRTable/TrTable";
import InputField from "../../components/TRInputField/InputFIeld";
import { InputRow, TRInputFormPanel, InputForm } from "../../components/TRInputForm/TRInputForm";
import ModalStore from "../../context/ModalStore";
import VipStore from "../../context/VipStore";
import { PanelPage, RightPanel } from "../../components/TRPanelPage/TRPanelPage";
import { Link } from "react-router-dom";

class VipManagement extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            vips: []
        }
    }

    showVipModal = () => {
        const { setShowVipModal } = ModalStore.getState();
        setShowVipModal(true);
    }

    componentDidMount () {
        const { getVips } = VipStore.getState();
        getVips();

        this.unsubscribe = VipStore.subscribe(state => {
            const vips = state.vips;
            this.setState({vips});
        });
    }

    viewModal = (data) => {
        const {setEditVipModal, getVipById } = VipStore.getState();
        getVipById(data.vipId);
        setEditVipModal(true);
    }

    confirmDelete = (data) => {
        const {setSelectedItem} = ModalStore.getState();
        const { setYesNoConfirmDelete } = VipStore.getState();
        setYesNoConfirmDelete(true); 
        setSelectedItem(data);
    }

    disableManyConfirm = (e) => {
        const { setSelectedItem, setShowVipDisableManyConfirm} = ModalStore.getState();
        if (e.length === 0) return;
        setSelectedItem(e);
        setShowVipDisableManyConfirm(true);
    }

    rightSideFilters = () => {

    return (
          <RightPanel>
            <InputForm>
              <InputRow titles={['Search Item Id']}>
                <InputField
                  placeholder="Search Item Id"
                  isSearch
                />
              </InputRow>
              <InputRow titles={['Search Name']}>
                <InputField
                  placeholder="Search Name"
                  isSearch
                />
              </InputRow>
              <InputRow titles={['Quantity']}>
                <InputField
                  number
                  placeholder="Enter quantity"
                />
              </InputRow>
              <InputRow titles={['Price']}>
                <InputField
                  number
                  placeholder="Enter price"
                />
              </InputRow>
            </InputForm>
          </RightPanel>
    );
  }

    render () {
        // const sampledata = [
        //     {vipId: '23', name: 'terk', email: 'email@gmail.com ', dateAdded: '23/23/23', status: 'ACTIVE', points: 234}
        // ];
        const { vipLoading } = VipStore.getState();
        const {user} = this.props;

        const tableDetail = {
            header: 'VIP DETAILS',
            hasButton: true,
            CB: () => this.showVipModal(),
            buttonInfo: 'NEW VIP',
            hasDelete: user.role.toLowerCase() === 'admin',
            search: (
                <InputField
                    placeholder="Search item"
                    isSearch
                    onEnterDown={value => console.log(value)} //todo: add search functionality
                />
            ),
            deleteBtnInfo: 'DISABLE VIP',
            CBD: (e) => this.disableManyConfirm(e)
        };

        return (
            <PanelPage
                user={this.props.user} 
                titlePage="VIP Management"
                subTitle="Manage your VIP customers and their rewards."
                hasTableFilters={true}
                onFilterToggle={(isOpen) => this.setState({ filtersOpen: isOpen })}
                filtersOpen={this.state.filtersOpen}
                rightPanel={this.rightSideFilters()}
            >
                <Table 
                    data={this.state.vips} 
                    hasAction={user.role.toLowerCase() === 'admin' ? true : false} 
                    hasSelect={user.role.toLowerCase() === 'admin' ? true : false} 
                    isDetailed={tableDetail} 
                    isLoading={vipLoading}
                    onEdit={(e) => this.viewModal(e)}
                    onDelete={(e) => this.confirmDelete(e)}
                />
                <li>
                <Link to="/addvip">test</Link>
                </li>
            </PanelPage>
        );
    }
}

export default VipManagement;