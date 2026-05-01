import React from "react";
import './RecentActivity.css';

class RecentActivity extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        const {
            activity
        } = this.props;

        return (
            <div className="ra-container">
                <div className="ra-content">
                    <h2 className="ra-title">Recent Activity</h2>
                    <ul className="ra-list">
                        <li className="recent-activity">{activity || 'No activities yet.'}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default RecentActivity;
