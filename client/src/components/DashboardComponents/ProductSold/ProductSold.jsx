import React from "react";
import productsold from "../../../assets/images/productsold.png";
import "./ProductSold.css";

class ProductSold extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={productsold} alt="totalsalesicon" />
        <h1>{"5"}</h1>
        <h2>Product Sold</h2>
        <p>+1.2% from yesterday</p>
      </div>
    );
  }
}

export default ProductSold;
