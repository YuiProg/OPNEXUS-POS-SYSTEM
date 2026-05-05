import React from "react";
import './VipManagement.css';
import { Table } from "../../components/TRTable/TrTable";
import InputField from "../../components/TRInputField/InputFIeld";
import ModalStore from "../../context/ModalStore";
import VipStore from "../../context/VipStore";

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
            <div className="vm-container">
                <div className="vm-top-contents">
                    <div className="vm-header">
                        <h1 className="vm-bigtitle">VIP Management</h1>
                        <p className="vm-sentence">Manage VIP customers here.</p>
                    </div>
                </div>
                <Table 
                    data={this.state.vips} 
                    hasAction={user.role.toLowerCase() === 'admin' ? true : false} 
                    hasSelect={user.role.toLowerCase() === 'admin' ? true : false} 
                    isDetailed={tableDetail} 
                    isLoading={vipLoading}
                    onEdit={(e) => this.viewModal(e)}
                    onDelete={(e) => this.confirmDelete(e)}
                />
            </div>
        );
    }
}

export default VipManagement;