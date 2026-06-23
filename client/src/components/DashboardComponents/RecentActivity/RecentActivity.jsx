import React from "react";
import './RecentActivity.css';
import { Activity } from 'lucide-react';

class RecentActivity extends React.Component {
    render() {
        const { activity } = this.props;

        // Determine display text safely based on incoming prop type
        let displayActivity = "No activities yet.";
        if (Array.isArray(activity) && activity.length > 0) {
            displayActivity = activity[0]?.message || activity[0];
        } else if (typeof activity === 'string' && activity) {
            displayActivity = activity;
        }

        return (
            <div className="ra-container">
                <div className="ra-content">
                    <span className="ra-label">System Feed</span>
                    <h2 className="ra-title">Recent Activity</h2>
                    <div className="ra-item-wrapper">
                        <span className="recent-activity" title={displayActivity}>
                            {displayActivity}
                        </span>
                    </div>
                </div>
                <div className="ra-icon-box">
                    <Activity size={20} strokeWidth={2} />
                </div>
            </div>
        );
    }
}

export default RecentActivity;