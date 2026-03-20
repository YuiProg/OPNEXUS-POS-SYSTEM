import React from "react";
import './TotalSales.css';
import totalsalesicon from '../../../assets/images/totalsalesicon.png';

class TotalSales extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <img src={totalsalesicon} alt="totalsalesicon" />
                <h1>{'PHP 123123'}</h1>
                <h2>Total Sales</h2>
                <p>+8% from yesterday</p>
            </div>
        );
    }
}

export default TotalSales;