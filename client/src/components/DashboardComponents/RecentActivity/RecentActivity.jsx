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
                <div className="ra-content">
                    <h2 className="ra-title">Recent Activity</h2>
                    <ul className="ra-list">
                        <li className="recent-activity">{recentActivity || 'activity'}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default RecentActivity;
