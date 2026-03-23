import React from "react";

class RecentActivity extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        const {
            recentActivity
        } = this.props;

        return (
            <div>
                <h1>Recent Activity</h1>
                <p>{recentActivity || 'activity'}</p>
            </div>
        );
    }
}

export default RecentActivity;
