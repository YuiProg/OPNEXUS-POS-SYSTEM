import { PhilippinePeso } from "lucide-react";
import React from "react";

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
                            <div key={i + 1}>
                                <p>ID: {data.Id}t</p>
                                {data.productImage 
                                ? (
                                <img src={data.productImage} alt="image" />
                                ) 
                                : null}
                                <h1>{data.productName}</h1>
                                <p><PhilippinePeso/>{data.price}</p>
                                <p>Stock: {data.quantity}</p>
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}

export default ProductCards;