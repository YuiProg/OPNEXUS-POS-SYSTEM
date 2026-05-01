import { PhilippinePeso, Package } from "lucide-react";
import React from "react";
import "./POSproductCards.css";

class ProductCards extends React.Component {
    constructor(props) {
        super(props);
        this.handleProductClick = this.handleProductClick.bind(this);
    }

    animateToCart(product, cardElement) {
        const cartButton = document.querySelector(".pos-container__cart-toggle");
        if (!cartButton || !cardElement) return;

        const cardRect = cardElement.getBoundingClientRect();
        const cartRect = cartButton.getBoundingClientRect();

        const flyingEl = document.createElement("div");
        flyingEl.className = "flying-product";

        if (product.productImage) {
            flyingEl.innerHTML = `<img src="${product.productImage}" alt="${product.productName}" />`;
        } else {
            flyingEl.innerHTML = `<div class="flying-product__placeholder">${product.productName}</div>`;
        }

        const startX = cardRect.left + cardRect.width / 2 - 30;
        const startY = cardRect.top + cardRect.height / 2 - 30;
        const endX = cartRect.left + cartRect.width / 2 - 15;
        const endY = cartRect.top + cartRect.height / 2 - 15;

        flyingEl.style.left = `${startX}px`;
        flyingEl.style.top = `${startY}px`;

        document.body.appendChild(flyingEl);

        flyingEl.getBoundingClientRect();

        flyingEl.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0.2)`;
        flyingEl.style.opacity = "0.5";

        flyingEl.addEventListener(
            "transitionend",
            () => {
                flyingEl.remove();

                cartButton.classList.add("cart-bounce");
                setTimeout(() => {
                    cartButton.classList.remove("cart-bounce");
                }, 300);
            },
            { once: true }
        );
    }

    handleProductClick(product, remainingStock, event) {
        if (remainingStock <= 0) return;

        const cardElement = event.currentTarget;

        this.animateToCart(product, cardElement);

        setTimeout(() => {
            this.props.onClick(product);
        }, 150);
    }

    render() {
        const { data, items = [] } = this.props;
        if (!data) return null;

        return (
            <div className="product-card-container">
                {data.map((product, i) => {
                    const cartItem = items.find((item) => item._id === product._id);
                    const remainingStock = product.quantity - (cartItem ? cartItem.quantity : 0);

                    return (
                        <div
                            onClick={(e) => this.handleProductClick(product, remainingStock, e)}
                            className={`product-card-container__items ${remainingStock <= 0 ? "out-of-stock" : ""}`}
                            key={i + 1}
                        >
                            <p className="product-card-container__id">ID: {product.Id}</p>

                            {product.productImage ? (
                                <img src={product.productImage} alt={product.productName} />
                            ) : (
                                <div className="product-card-container__placeholder">
                                    <Package size={64} />
                                </div>
                            )}

                            <div className="product-card-container__content">
                                <h1>{product.productName}</h1>
                                <p className="product-card-container__price">
                                    <PhilippinePeso />
                                    {product.price}
                                </p>
                                <p className="product-card-container__stocks">
                                    Stock: {remainingStock}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default ProductCards;