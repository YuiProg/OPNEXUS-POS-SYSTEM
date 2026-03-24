import React from "react";
import './RecentActivity.css';

class RecentActivity extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        const {
            recentActivity
        } = this.props;

        return (
            <div className="ra-container">
                <h1>Recent Activity</h1>
                <p>{recentActivity || 'activity'}</p>
            </div>
        );
    }
}

export default RecentActivity;
