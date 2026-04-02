import React from "react";
import './Logs.css';
import DropDown from "../../components/TRDropDown/Dropdown";
import { Table } from "../../components/TRTable/TrTable";
import TimeInOutStore from "../../context/TimeinOut";

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

    render () { 
        const { timeInLoading } = TimeInOutStore.getState();
        return (
            <>
            <div className="logs-container">
                <div className="logs-top-contents">
                    <div className="logs-header">
                        <h1 className="logs-bigtitle">Stock Overview</h1>
                        <p className="logs-sentence">Manage stock, items, and quantities.</p>
                    </div>
                    <div className="logs-branch-dropdown">
                        <p className="logs-branch-text">Branch</p>
                        <DropDown className="logs-branch-dd" />
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
                            <Table data={this.state.timeInData} isLoading={timeInLoading}/>
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