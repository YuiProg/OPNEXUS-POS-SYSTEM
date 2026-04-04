import React from "react";
import './POS.css';
import ProductCards from "../../components/ProductCards/ProductCards";
import ProductStore from "../../context/ProductStore";

class POS extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount() {
        const { fetchProducts, subscribeToProducts } = ProductStore.getState();
        fetchProducts();
        subscribeToProducts();
    }

    render () {
        return (
            <div className="pos-container">
                <ProductCards />
            </div>
        );
    }
}

export default POS;