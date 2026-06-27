import React from 'react';
import { PanelPage } from '../../components/TRPanelPage/TRPanelPage';

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
                
            </PanelPage>
        );
    }
}

export default SystemLogs;