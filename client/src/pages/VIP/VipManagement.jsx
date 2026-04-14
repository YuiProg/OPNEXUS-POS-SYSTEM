import React from "react";
import './VipManagement.css';
import { Table } from "../../components/TRTable/TrTable";
import InputField from "../../components/TRInputField/InputFIeld";
import ModalStore from "../../context/ModalStore";

class VipManagement extends React.Component {
    constructor (props) {
        super(props);
    }

    showVipModal = () => {
        const { setShowVipModal } = ModalStore.getState();
        setShowVipModal(true);
    }

    render () {
        const sampledata = [
            {vipId: '23', name: 'terk', email: 'email@gmail.com ', dateAdded: '23/23/23', status: 'ACTIVE', points: 234}
        ];

        const tableDetail = {
            header: 'VIP DETAILS',
            hasButton: true,
            CB: () => this.showVipModal(),
            buttonInfo: 'NEW VIP',
            hasDelete: true,
            search: (
                <InputField
                    placeholder="Search item"
                    isSearch
                    onEnterDown={value => console.log(value)}
                />
            ),
            deleteBtnInfo: 'DISABLE VIP'
        };

        return (
            <div className="vm-container">
                <div className="vm-top-contents">
                    <div className="vm-header">
                        <h1 className="vm-bigtitle">VIP Management</h1>
                        <p className="vm-sentence">Manage VIP customers here.</p>
                    </div>
                </div>
                <Table data={sampledata} hasAction hasSelect isDetailed={tableDetail}/>
            </div>
        );
    }
}

export default VipManagement;