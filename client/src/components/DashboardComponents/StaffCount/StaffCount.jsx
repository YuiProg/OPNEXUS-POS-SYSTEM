import React from "react";
import './StaffCount.css';
import { User } from 'lucide-react';
import { Link } from "react-router-dom";

class StaffCount extends React.Component {
    render() {
        const { activeClerks } = this.props;
        
        return (
            <Link to="/staff" className="staff-count-link">
                <div className="active-clerks-container">
                    <div className="ac-content">
                        <span className="ac-label">ACTIVE CLERKS</span>
                        <h1 className="ac-value">{activeClerks || 0}</h1>                    
                    </div>
                    <div className="ac-icon">
                        <User size={32} strokeWidth={1.5} />
                    </div>
                </div>
            </Link>
        );
    }
}

export default StaffCount;