import React from "react";
import './Logs.css';
import DropDown from "../../components/TRDropDown/Dropdown";
import { Table } from "../../components/TRTable/TrTable";

class Logs extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
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
                        <button>System Logs</button>
                        <button>In/Out Logs</button>
                        <button>Transaction History</button>
                    </div>
                    <Table data={[]}/>
                </div>
            </div>
            </>
        );
    }
}

export default Logs;