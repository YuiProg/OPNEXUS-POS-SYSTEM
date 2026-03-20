import React from "react";
import './LowStockItems.css';

class LowStockItems extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        const {
            lowStockItems
        } = this.props;
        
        return (
            <div>
                <p>Low Stock Items</p>
                <div>
                    {lowStockItems ? (
                        lowStockItems.map((l, i) => {
                            return (
                                <div key={i}>
                                    <p>- {l}</p>
                                </div>
                            )
                        })
                    ) : null}
                </div>
            </div>
        );
    }
}

export default LowStockItems