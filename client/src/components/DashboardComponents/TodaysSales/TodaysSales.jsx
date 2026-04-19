import React from "react";
import "./TodaysSales.css";
import TotalSales from "../TotalSales/TotalSales";
import ProductSold from "../ProductSold/ProductSold";
import StocksDB from "../StocksIcon/StocksDB";
import DashboardStore from "../../../context/DashboardStore";

class TodaysSales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productSold: 0,
      totalSales: 0,
      totalStocks: 0
    }
  }

  componentDidMount () {
    const { getTodaysSales } = DashboardStore.getState();
    getTodaysSales();
    this.unsubscribe = DashboardStore.subscribe((state) => {
      const today = state.todaySales;
      const {productSold, totalSales, totalStocks} = today.data;
      this.setState({productSold, totalSales, totalStocks});
    });
  }

  render() {
    return (
      <div className="todays-sales-container">
        <h1 className="todays-sales-title">Today's Sales</h1>
        <p className="todays-sales-label">Sales Summary</p>
        <div className="todays-sales-content">
          <TotalSales sale={this.state.totalSales}/>
          <ProductSold sold={this.state.productSold}/>
          <StocksDB stock={this.state.totalStocks}/>
        </div>
      </div>
    );
  }
}

export default TodaysSales;