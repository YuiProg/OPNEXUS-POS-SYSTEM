import React from "react";
import './VipManagement.css';

class VipManagement extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="vm-container">
                <div className="vm-top-contents">
                    <div className="vm-header">
                        <h1 className="vm-bigtitle">VIP Management</h1>
                        <p className="vm-sentence">Manage VIP customers here.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default VipManagement;