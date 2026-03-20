import React from "react";
import './StaffCount.css';

class StaffCount extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        const {
            activeClerks
        } = this.props;
        return (
            <div>
                <h1>ACTIVE CLERKS {activeClerks || 0}</h1>
            </div>
        );
    }
}

export default StaffCount;