import React from "react";
import './TotalSales.css';
import totalsalesicon from '../../../assets/images/totalsalesicon.png';
import { Link } from "react-router-dom";

class TotalSales extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Link to="/logs" className="total-sales-link">
                <div className="total-sales-container">
                    <img className="total-sales-icon" src={totalsalesicon} alt="totalsalesicon" />
                    <h1 className="total-sales-amount">PHP {Number(this.props.sale).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                    <h2 className="total-sales-label">Total Sales</h2>
                    {/* <p className="total-sales-change">+8% from yesterday</p> */}
                </div>
            </Link>
        );
    }
}

export default TotalSales;