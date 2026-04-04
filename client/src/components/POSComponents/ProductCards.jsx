import { PhilippinePeso } from "lucide-react";
import React from "react";
import './POSproductCards.css';

class ProductCards extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            data
        } = this.props;
        if (!data) return;
        return (
            <>
                <div className="product-card-container">
                    {data.map((data, i) => {
                        return (
                            <div className="product-card-container__items" key={i + 1}>
                                <p className="product-card-container__id">ID: {data.Id}</p>

                                {data.productImage && (
                                    <img src={data.productImage} alt="image" />
                                )}

                                <div className="product-card-container__content">
                                    <h1>{data.productName}</h1>
                                    <p className="product-card-container__price">
                                        <PhilippinePeso />{data.price}
                                    </p>
                                    <p className="product-card-container__stocks">
                                        Stock: {data.quantity}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

export default ProductCards;