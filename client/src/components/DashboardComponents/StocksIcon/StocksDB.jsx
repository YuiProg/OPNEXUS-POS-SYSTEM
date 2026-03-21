import React from "react";
import "./StocksDB.css";
import stocksicon from "../../../assets/images/stocksicon.png";

class StocksDB extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stocks-container">
        <img className="stocks-icon" src={stocksicon} alt="stocksicon" />
        <h1 className="stocks-amount">{"321"}</h1>
        <h2 className="stocks-label">Stocks</h2>
        <p className="stocks-change">+1.2% from yesterday</p>
      </div>
    );
  }
}

export default StocksDB;
