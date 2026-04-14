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

    render () {
        // const sampledata = [
        //     {vipId: '23', name: 'terk', email: 'email@gmail.com ', dateAdded: '23/23/23', status: 'ACTIVE', points: 234}
        // ];
        const { vipLoading } = VipStore.getState();

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
            deleteBtnInfo: 'DISABLE VIP',
            CBD: (e) => console.log(e)
        };

        return (
            <div className="vm-container">
                <div className="vm-top-contents">
                    <div className="vm-header">
                        <h1 className="vm-bigtitle">VIP Management</h1>
                        <p className="vm-sentence">Manage VIP customers here.</p>
                    </div>
                </div>
                <Table data={this.state.vips} hasAction hasSelect isDetailed={tableDetail} isLoading={vipLoading}/>
            </div>
        );
    }
}

export default VipManagement;