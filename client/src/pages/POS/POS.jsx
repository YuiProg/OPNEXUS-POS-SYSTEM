import React from "react";
import './POS.css';
import ProductCards from "../../components/POSComponents/ProductCards";
import ProductStore from "../../context/ProductStore";
import InputField from "../../components/TRInputField/InputFIeld";

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
        const { productsUncleaned } = ProductStore.getState();

        return (
            <div className="pos-container">
                {/* TOP SECTION */}
                <div>
                {/* DITO YUNG SEARCH MACKY TSAKA SORTING */}
                    <InputField text placeholder="Search Products"/>
                </div>
                {/* ETO YUNG MGA PRODUCT CARDS */}
                <div>
                    <ProductCards data={productsUncleaned}/>
                </div>
                {/* RIGHT SECTION CALCULATOR ITEMS ETC. */}
                <div>

                </div>
            </div>
        );
    }
}

export default POS;