import React from "react";
import "./POS.css";
import ProductCards from "../../components/POSComponents/ProductCards";
import ProductStore from "../../context/ProductStore";
import InputField from "../../components/TRInputField/InputFIeld";
import Calculator from "../../components/Calculator/Calculator.jsx";
import AuthStore from "../../context/Authstore.js";

class POS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isCartOpen: false
        };
    }

    addItemsToCart = (data) => {
        this.setState((prev) => {
            const existing = prev.items.find((item) => item._id === data._id);

            if (existing) {
                return {
                    items: prev.items.map((item) =>
                        item._id === data._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                    isCartOpen: true
                };
            }

            return {
                items: [...prev.items, { ...data, quantity: 1 }],
                isCartOpen: true
            };
        });
    };

    toggleCart = () => {
        this.setState((prev) => ({
            isCartOpen: !prev.isCartOpen
        }));
    };

    clearCart = () => {
        this.setState({
            items: []
        });
    };

    componentDidMount() {
        const { AuthUser } = AuthStore.getState();
        console.log(AuthUser);
        const { fetchProducts, subscribeToProducts } = ProductStore.getState();
        fetchProducts();
        subscribeToProducts();
    }

    render() {
        const { productsUncleaned } = ProductStore.getState();
        const { items, isCartOpen } = this.state;

        const totalCartQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

        return (
            <div className={`pos-container ${isCartOpen ? "cart-open" : "cart-closed"}`}>
                <div className="pos-container__filter-cards">
                    <div className="pos-container__filter-cart">
                        <div className="pos-container__search">
                            <InputField text placeholder="Search products..." />
                        </div>

                        <button
                            type="button"
                            className="pos-container__cart-toggle"
                            onClick={this.toggleCart}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="19"
                                viewBox="0 0 20 19"
                                fill="none"
                            >
                                <path
                                    d="M0.833252 1H3.33325L5.83325 10.1667M5.83325 10.1667L4.99992 13.5H17.4999M5.83325 10.1667H15.8333L18.3333 2.66667H3.78742L5.83325 10.1667ZM5.83325 16.8333C5.83325 17.0543 5.74545 17.2663 5.58917 17.4226C5.43289 17.5789 5.22093 17.6667 4.99992 17.6667C4.7789 17.6667 4.56694 17.5789 4.41066 17.4226C4.25438 17.2663 4.16659 17.0543 4.16659 16.8333C4.16659 16.6123 4.25438 16.4004 4.41066 16.2441C4.56694 16.0878 4.7789 16 4.99992 16C5.22093 16 5.43289 16.0878 5.58917 16.2441C5.74545 16.4004 5.83325 16.6123 5.83325 16.8333ZM17.4999 16.8333C17.4999 17.0543 17.4121 17.2663 17.2558 17.4226C17.0996 17.5789 16.8876 17.6667 16.6666 17.6667C16.4456 17.6667 16.2336 17.5789 16.0773 17.4226C15.921 17.2663 15.8333 17.0543 15.8333 16.8333C15.8333 16.6123 15.921 16.4004 16.0773 16.2441C16.2336 16.0878 16.4456 16 16.6666 16C16.8876 16 17.0996 16.0878 17.2558 16.2441C17.4121 16.4004 17.4999 16.6123 17.4999 16.8333Z"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="square"
                                />
                            </svg>

                            <span className="pos-container__cart-count">
                                {totalCartQuantity}
                            </span>
                        </button>
                    </div>

                    <div className="pos-product-cards">
                        <ProductCards
                            onClick={(data) => this.addItemsToCart(data)}
                            data={productsUncleaned}
                            items={items}
                        />
                    </div>
                </div>

                <div className={`pos-container__container-cart ${isCartOpen ? "open" : ""}`}>
                    <div className="pos-container__cart">
                        <div className="pos-container__cart_heading">
                            <h2>Cart ({totalCartQuantity})</h2>
                            <button
                                type="button"
                                className="pos-container__clear-btn"
                                onClick={this.clearCart}
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="pos-container__cart-items">
                            {items.length === 0 ? (
                                <div className="pos-container__cart-empty">
                                    No items in cart.
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div className="pos-container__cart-item" key={item._id}>
                                        <div className="pos-container__cart-item-details">
                                            <h4>{item?.productName || item?.name}</h4>
                                            <p>
                                                PHP{" "}
                                                {item?.sellingPrice ||
                                                    item?.price ||
                                                    item?.originalPrice ||
                                                    0}
                                            </p>
                                        </div>

                                        <div className="pos-container__cart-item-actions">
                                            <span>-</span>
                                            <span>{item.quantity}</span>
                                            <span>+</span>
                                            <button type="button">Remove</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="pos-container__cart-totalization">
                            <Calculator />

                            <div className="pos-container__cart-totalization-subtotal">
                                <p>Subtotal</p>
                                <p>Discount</p>
                                <p>Tax</p>

                                <div className="pos-container__cart-totalization-total">
                                    <p>PHP</p>
                                    <p>950.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default POS;