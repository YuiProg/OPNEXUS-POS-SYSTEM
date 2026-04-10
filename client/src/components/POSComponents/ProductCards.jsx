import { PhilippinePeso } from "lucide-react";
import React from "react";
import './POSproductCards.css';

class ProductCards extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
    const { data, onClick, items = [] } = this.props;
    if (!data) return;

    return (
            <>
                <div className="product-card-container">
                    {data.map((product, i) => {
                        const cartItem = items.find(item => item._id === product._id);
                        const remainingStock = product.quantity - (cartItem ? cartItem.quantity : 0);

                        return (
                            <div 
                                onClick={() => remainingStock > 0 ? onClick(product) : null} 
                                className={`product-card-container__items ${remainingStock <= 0 ? 'out-of-stock' : ''}`} 
                                key={i + 1}
                            >
                                <p className="product-card-container__id">ID: {product.Id}</p>

                                {product.productImage && (
                                    <img src={product.productImage} alt="image" />
                                )}

                                <div className="product-card-container__content">
                                    <h1>{product.productName}</h1>
                                    <p className="product-card-container__price">
                                        <PhilippinePeso />{product.price}
                                    </p>
                                    <p className="product-card-container__stocks">
                                        Stock: {remainingStock}
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