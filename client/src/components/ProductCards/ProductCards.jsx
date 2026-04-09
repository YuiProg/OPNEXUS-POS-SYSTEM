import React from 'react'
import './ProductCards.css';

class ProductCards extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
      const { data } = this.props;
        return (
          <div>
            {data?.map((data, i) => {
              <div key={i} className="product-card-container">
                <div className="product-card-image">
                  
                </div>
              </div>
            })}
          </div>
        );
    }
}

export default ProductCards;