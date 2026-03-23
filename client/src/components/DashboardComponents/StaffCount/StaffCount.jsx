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
                <p className="active-clerks-label">ACTIVE CLERKS</p>
                <h1>{activeClerks || 0}</h1>
                <User size={40}/>
            </div>
        );
    }
}

export default StaffCount;