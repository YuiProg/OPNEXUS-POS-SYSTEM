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
      totalStocks: 0,
      todayLoading: false,
    }
  }

  componentDidMount() {
    const { getTodaysSales, todayLoading } = DashboardStore.getState();
    this.setState({ todayLoading });
    getTodaysSales();

    this.unsubscribe = DashboardStore.subscribe((state) => {
      this.setState({ todayLoading: state.todayLoading });
      if (state.todaySales?.data) {
        const { productSold, totalSales, totalStocks } = state.todaySales.data;
        this.setState({ productSold, totalSales, totalStocks });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    const { productSold, totalSales, totalStocks, todayLoading } = this.state;
    return (
      <div className="todays-sales-container">
        <h1 className="todays-sales-title">Today's Sales</h1>
        <p className="todays-sales-label">Sales Summary</p>
        {todayLoading ? (
          <div className="todays-sales-loading">
            <span className="todays-spinner"></span>
          </div>
        ) : (
          <div className="todays-sales-content">
            <TotalSales sale={totalSales} />
            <ProductSold sold={productSold} />
            <StocksDB stock={totalStocks} />
          </div>
        )}
      </div>
    );
  }
}

export default TodaysSales;