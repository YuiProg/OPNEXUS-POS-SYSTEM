import React from "react";
import "./TodaysSales.css";
import TotalSales from "../TotalSales/TotalSales";
import ProductSold from "../ProductSold/ProductSold";
import StocksDB from "../StocksIcon/StocksDB";

class TodaysSales extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="todays-sales-container">
        <h1 className="todays-sales-title">Today's Sales</h1>
        <p className="todays-sales-label">Sales Summary</p>
        <div className="todays-sales-content">
          <TotalSales />
          <ProductSold />
          <StocksDB />
        </div>
      </div>
    );
  }
}

export default TodaysSales;