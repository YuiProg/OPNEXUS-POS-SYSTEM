import React from 'react';
import { PanelPage } from '../../components/TRPanelPage/TRPanelPage';
import { Table } from '../../components/TRTable/TrTable';

class SystemLogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [],
        };
    }

    render () {
        return (
            <PanelPage 
                titlePage="System Logs" 
                subTitle="View system logs"
            >
                <Table 
                    data={this.state.logs}
                    isDetailed={{header: 'System Logs'}}
                />
            </PanelPage>
        );
    }
}

export default SystemLogs;