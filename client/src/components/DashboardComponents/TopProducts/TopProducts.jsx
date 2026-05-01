import React from "react";
import './TopProducts.css'
import ProgressBar from "../Charts/ProgressBar";
import DashboardStore from "../../../context/DashboardStore";

class TopProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topProducts: [],
      topProductsLoading: false,
    };
  }

  componentDidMount() {
    const { getTopProducts } = DashboardStore.getState();
    getTopProducts();

    this.unsubscribe = DashboardStore.subscribe((state) => {
      const products = state.topProducts?.data;
      if (products && products.length > 0) {
        this.setState({ topProducts: products });
      }
      this.setState({ topProductsLoading: state.topProductsLoading });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
      const { topProducts, topProductsLoading } = this.state;
      return (
        <div className="tp-container">
          <h1 className="tp-title">Top Products</h1>
          {topProductsLoading ? (
            <div className="tp-loading">
              <span className="spinner"></span>
            </div>
          ) : (
            <>
              <table className="tp-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Popularity</th>
                    <th>Sales</th>
                  </tr>
                </thead>
              </table>
              <div className="tp-table-wrapper">
                <table className="tp-table">
                  <tbody>
                    {topProducts.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No data available</td>
                      </tr>
                    ) : (
                      topProducts.map((item, i) => (
                        <tr key={i}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td><ProgressBar bgcolor={item.bgcolor} bgcolor2={item.bgcolor2} completed={item.completed} /></td>
                          <td>{item.sales}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      );
  }
}

export default TopProducts;