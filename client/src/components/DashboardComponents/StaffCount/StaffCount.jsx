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
                <div className="active-clerks-content">
                    <p className="active-clerks-label">ACTIVE CLERKS</p>
                    <h1>{activeClerks || 0}</h1>
                    <User className="active-clerks-icon" size={40}/>
                </div>
            </div>
        );
    }
}

export default StaffCount;