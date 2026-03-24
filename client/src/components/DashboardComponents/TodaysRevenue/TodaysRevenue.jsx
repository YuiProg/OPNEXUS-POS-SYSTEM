import React from "react";
import './TodaysRevenue.css';

class TodaysRevenue extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="tr-container">
                <div className="tr-content">
                    <p className="tr-label">Today's revenue</p>
                    <h1 className="tr-head">{`PHP ${321}`}</h1>
                    <p className="tr-label">0% from yesterday</p>
                </div>
            </div>
        );
    }
}

export default TodaysRevenue;