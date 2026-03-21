import React from "react";
import './TodaysRevenue.css';

class TodaysRevenue extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="tr-container">
                <p className="tr-label">Today's revenue</p>
                <h1 className="tr-head">{`PHP ${321}`}</h1>
                <p className="tr-label">0% from yesterday</p>
            </div>
        );
    }
}

export default TodaysRevenue;