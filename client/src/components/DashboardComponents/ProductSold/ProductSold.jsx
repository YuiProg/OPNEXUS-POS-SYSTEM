import React from "react";
import productsold from "../../../assets/images/productsold.png";
import "./ProductSold.css";
import { Link } from "react-router-dom";

class ProductSold extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to="/logs" className="products-sold-link">
        <div className="products-sold-container">
          <img className="products-sold-icon" src={productsold} alt="productsold" />
          <h1 className="products-sold">{this.props.sold}</h1>
          <h2 className="products-sold-label">Product Sold</h2>
          {/* <p className="products-sold-change">+1.2% from yesterday</p> */}
        </div>
      </Link>
    );
  }
}

export default ProductSold;
