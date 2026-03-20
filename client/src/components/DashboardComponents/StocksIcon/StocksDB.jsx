import React from "react";
import "./StocksDB.css";
import stocksicon from "../../../assets/images/stocksicon.png";

class StocksDB extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={stocksicon} alt="totalsalesicon" />
        <h1>{"321"}</h1>
        <h2>Stocks</h2>
        <p>+1.2% from yesterday</p>
      </div>
    );
  }
}

export default StocksDB;
