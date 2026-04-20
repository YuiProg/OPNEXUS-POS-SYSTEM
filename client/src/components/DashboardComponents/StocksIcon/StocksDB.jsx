import React from "react";
import "./StocksDB.css";
import stocksicon from "../../../assets/images/stocksicon.png";
import { Link } from "react-router-dom";

class StocksDB extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to="/inventory" className="stocks-link">
        <div className="stocks-container">
          <img className="stocks-icon" src={stocksicon} alt="stocksicon" />
          <h1 className="stocks-amount">{this.props.stock}</h1>
          <h2 className="stocks-label">Stocks</h2>
          {/* <p className="stocks-change">+1.2% from yesterday</p> */}
        </div>
      </Link>
    );
  }
}

export default StocksDB;
