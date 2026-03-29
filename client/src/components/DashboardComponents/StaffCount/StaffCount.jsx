import React from "react";
import './StaffCount.css';
import { User } from 'lucide-react';

class StaffCount extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        const {
            activeClerks
        } = this.props;
        return (
            <div className="active-clerks-container">
                <div className="ac-content">
                    <p className="ac-label">ACTIVE CLERKS</p>
                    <h1>{activeClerks || 0}</h1>                    
                </div>
                <div className="ac-icon">
                    <User className="icon-png" size={40}/>
                </div>
            </div>
        );
    }
}

export default StaffCount;