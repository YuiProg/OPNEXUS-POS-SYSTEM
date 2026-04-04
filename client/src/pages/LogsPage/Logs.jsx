import React from "react";
import './Logs.css';
import DropDown from "../../components/TRDropDown/Dropdown";
import { Table } from "../../components/TRTable/TrTable";
import TimeInOutStore from "../../context/TimeinOut";
import ModalStore from "../../context/ModalStore";
import AuthStore from "../../context/Authstore";
import toast from "react-hot-toast";

class Logs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedTab: 'system',
            timeInData: []
        }
    }

    componentDidMount() {
        const { getAllData } = TimeInOutStore.getState();
        getAllData();

        this.unsubscribe = TimeInOutStore.subscribe((state) => {
            //console.log(state.allTimeData);
            this.setState({timeInData: state.allTimeData});
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    showViewModal = (data) => {
        const { setTimeInModal, setSelectedItem } = ModalStore.getState();
        const { getSingleUser } = AuthStore.getState();
        const { getData } = TimeInOutStore.getState();
        try {
            setTimeInModal(true);
            setSelectedItem(data);
            getSingleUser(data.userId);   
            getData(data.userId);
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    render () { 
        const { timeInLoading } = TimeInOutStore.getState();

        const uniqueUsers = Object.values(
            this.state.timeInData.reduce((acc, record) => {
                if (!acc[record.userId]) {
                acc[record.userId] = {
                    employeeName: record.employeeName,
                    userId: record.userId,
                    totalHours: 0,  // start at 0, accumulate below
                };
                }
                acc[record.userId].totalHours += record.totalHours;  // sum all sessions
                return acc;
            }, {})
        );
        return (
            <>
            <div className="logs-container">
                <div className="logs-top-contents">
                    <div className="logs-header">
                        <h1 className="logs-bigtitle">Activity Logs</h1>
                        <p className="logs-sentence">Track system actions and history.</p>
                    </div>
                    <div className="logs-branch-dropdown">
                        <p className="logs-branch-text">Branch</p>
                        <DropDown 
                        className="logs-branch-dd" 
                        defaultValue="Branch"
                        />
                    </div>
                </div>
                <div>
                    {/* NAV BUTTONS */}
                    <div>
                        <button onClick={() => this.setState({selectedTab: 'system'})}>System Logs</button>
                        <button onClick={() => this.setState({selectedTab: 'time'})}>In/Out Logs</button>
                        <button onClick={() => this.setState({selectedTab: 'transact'})}>Transaction History</button>
                    </div>
                    {this.state.selectedTab === 'system' 
                        ? (
                            <Table data={[]}/>
                        ) 
                        : this.state.selectedTab === 'time' 
                        ? (
                            <Table data={uniqueUsers} isLoading={timeInLoading} onRowSelect={(e) => this.showViewModal(e)}/>
                        ) 
                        : this.state.selectedTab === 'transact' 
                        ? (
                            <Table data={[]}/>
                        ) 
                        : null}
                </div>
            </div>
            </>
        );
    }
}

export default Logs;