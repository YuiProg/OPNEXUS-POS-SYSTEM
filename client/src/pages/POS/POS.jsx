import React from "react";
import "./POS.css";
import ProductCards from "../../components/POSComponents/ProductCards";
import ProductStore from "../../context/ProductStore";
import InputField from "../../components/TRInputField/InputFIeld";
import Calculator from "../../components/Calculator/Calculator.jsx";
import AuthStore from "../../context/Authstore.js";
import Button from "../../components/TRButton/Button.jsx";
import SalesStore from "../../context/SalesStore.js";
import VipStore from "../../context/VipStore.js";
import toast from "react-hot-toast";

class POS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isCartOpen: false,
            amountPaid: 0,
            search: "",
            vipActive: false,
            idNumber: "",
            fetchedVipDetails: null,
            isVipCardValid: false,
            isCheckingVip: false,
            vipStatus: null // 'active', 'expired', 'invalid'
        };
        this.calculatorRef = React.createRef();
        this.idTypingTimeout = null;
    }

    handleIDChange = (value) => {
        const { getVipById } = VipStore.getState();
        this.setState({ 
            idNumber: value,
            isVipCardValid: false,
            fetchedVipDetails: null,
            isCheckingVip: true,
            vipStatus: null
        });
        
        if (this.idTypingTimeout) clearTimeout(this.idTypingTimeout);

        this.idTypingTimeout = setTimeout(async () => {
            if (value) {
                const data = await getVipById(value);
                if (!data) {
                    this.setState({ 
                        isCheckingVip: false,
                        isVipCardValid: false,
                        fetchedVipDetails: null,
                        vipStatus: 'invalid'
                    });
                    return toast.error('Card invalid');
                }
                
                // Check if VIP card status is ACTIVE
                if (data.status !== "ACTIVE") {
                    this.setState({ 
                        isCheckingVip: false,
                        isVipCardValid: false,
                        fetchedVipDetails: data,
                        vipStatus: 'expired'
                    });
                    return toast.error('VIP card is not active');
                }
                
                this.setState({
                    fetchedVipDetails: data,
                    isVipCardValid: true,
                    isCheckingVip: false,
                    vipStatus: 'active'
                });
                
                toast.success(`VIP card found for: ${data.firstName || 'Member'} - Points: ${data.points || 0}`);
            } else {
                this.setState({ 
                    isCheckingVip: false,
                    isVipCardValid: false,
                    vipStatus: null
                });
            }
        }, 2000);
    };

    addItemsToCart = (data) => {
        this.setState((prev) => {
            const existing = prev.items.find((item) => item._id === data._id);
            if (existing) {
                return {
                    items: prev.items.map((item) =>
                        item._id === data._id ? { ...item, quantity: item.quantity + 1 } : item
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

    increaseQuantity = (id) => {
        this.setState((prev) => ({
            items: prev.items.map((item) =>
                item._id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        }));
    };

    decreaseQuantity = (id) => {
        this.setState((prev) => {
            const item = prev.items.find((i) => i._id === id);
            if (item.quantity === 1) return { items: prev.items.filter((i) => i._id !== id) };
            return {
                items: prev.items.map((i) => i._id === id ? { ...i, quantity: i.quantity - 1 } : i)
            };
        });
    };

    removeItem = (id) => {
        this.setState((prev) => ({ items: prev.items.filter((item) => item._id !== id) }));
    };

    toggleCart = () => {
        this.setState((prev) => ({ isCartOpen: !prev.isCartOpen }));
    };

    clearCart = () => {
        this.setState({
            items: [],
            amountPaid: 0,
            idNumber: "",
            vipActive: false,
            isVipCardValid: false,
            fetchedVipDetails: null,
            isCheckingVip: false,
            vipStatus: null
        });
    };

    calculateDiscount = (subtotal, points) => {
        // Discount is equal to points, but cannot exceed subtotal
        const discount = Math.min(points, subtotal);
        return discount;
    };

    processOrder = () => {
        const { processOrder } = SalesStore.getState();
        const { items, amountPaid, fetchedVipDetails } = this.state;
        let subtotal = items.reduce((acc, item) => acc + this.getItemPrice(item) * item.quantity, 0);
        
        // Apply points discount automatically if VIP is active
        let discountAmount = 0;
        if (this.state.vipActive && fetchedVipDetails) {
            discountAmount = this.calculateDiscount(subtotal, fetchedVipDetails.points || 0);
            subtotal = subtotal - discountAmount;
        }
        
        const change = amountPaid - subtotal;
        
        // Calculate remaining points after transaction
        const remainingPoints = fetchedVipDetails 
            ? (fetchedVipDetails.points || 0) - discountAmount
            : 0;
        
        processOrder({ 
            subtotal, 
            change, 
            items, 
            amountPaid, 
            vip: this.state.vipActive ? 'Yes' : 'No',
            purchasedBy: fetchedVipDetails,
            discountAmount,
            pointsUsed: discountAmount,
            remainingPoints
        });
        
        this.clearCart();
        this.calculatorRef.current?.reset();
    }

    componentDidMount() {
        const { AuthUser } = AuthStore.getState();
        const { fetchProducts, subscribeToProducts } = ProductStore.getState();
        fetchProducts(true, AuthUser.branchLocation);
        subscribeToProducts();
    }

    componentWillUnmount() {
        if (this.idTypingTimeout) clearTimeout(this.idTypingTimeout);
    }

    getItemPrice = (item) => Number(item?.sellingPrice || item?.price || item?.originalPrice || 0);

    toggleVIP = () => this.setState((prev) => ({ 
        vipActive: !prev.vipActive,
        isVipCardValid: false,
        fetchedVipDetails: null,
        idNumber: "",
        vipStatus: null
    }));

    render() {
        const { productsUncleaned } = ProductStore.getState();
        const { 
            items, 
            isCartOpen, 
            amountPaid, 
            search, 
            idNumber, 
            vipActive,
            isVipCardValid,
            isCheckingVip,
            fetchedVipDetails,
            vipStatus
        } = this.state;
        const { saleLoading } = SalesStore.getState();

        const totalCartQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
        let subtotal = items.reduce((acc, item) => acc + this.getItemPrice(item) * item.quantity, 0);
        
        // Calculate points discount automatically
        let discountAmount = 0;
        let finalTotal = subtotal;
        let availablePoints = fetchedVipDetails?.points || 0;
        
        if (vipActive && isVipCardValid) {
            discountAmount = this.calculateDiscount(subtotal, availablePoints);
            finalTotal = subtotal - discountAmount;
        }
        
        const change = amountPaid - finalTotal;

        const filteredProducts = search
            ? productsUncleaned.filter((p) =>
                (p.productName || p.name || "").toLowerCase().includes(search.toLowerCase()) ||
                (p.category || "").toLowerCase().includes(search.toLowerCase())
            )
            : productsUncleaned;

        return (
            <div className={`pos-container ${isCartOpen ? "cart-open" : "cart-closed"}`}>
                <div className="pos-container__filter-cards">
                    <div className="pos-container__filter-cart">
                        <div className="pos-container__search">
                            <InputField text placeholder="Search products..." onChange={(value) => this.setState({search: value})}/>
                        </div>

                        <button type="button" className="pos-container__cart-toggle" onClick={this.toggleCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                                <path d="M0.833252 1H3.33325L5.83325 10.1667M5.83325 10.1667L4.99992 13.5H17.4999M5.83325 10.1667H15.8333L18.3333 2.66667H3.78742L5.83325 10.1667ZM5.83325 16.8333C5.83325 17.0543 5.74545 17.2663 5.58917 17.4226C5.43289 17.5789 5.22093 17.6667 4.99992 17.6667C4.7789 17.6667 4.56694 17.5789 4.41066 17.4226C4.25438 17.2663 4.16659 17.0543 4.16659 16.8333C4.16659 16.6123 4.25438 16.4004 4.41066 16.2441C4.56694 16.0878 4.7789 16 4.99992 16C5.22093 16 5.43289 16.0878 5.58917 16.2441C5.74545 16.4004 5.83325 16.6123 5.83325 16.8333ZM17.4999 16.8333C17.4999 17.0543 17.4121 17.2663 17.2558 17.4226C17.0996 17.5789 16.8876 17.6667 16.6666 17.6667C16.4456 17.6667 16.2336 17.5789 16.0773 17.4226C15.921 17.2663 15.8333 17.0543 15.8333 16.8333C15.8333 16.6123 15.921 16.4004 16.0773 16.2441C16.2336 16.0878 16.4456 16 16.6666 16C16.8876 16 17.0996 16.0878 17.2558 16.2441C17.4121 16.4004 17.4999 16.6123 17.4999 16.8333Z" stroke="white" strokeWidth="2" strokeLinecap="square" />
                            </svg>
                            <span className="pos-container__cart-count">{totalCartQuantity}</span>
                        </button>
                    </div>

                    <div className="pos-product-cards">
                        <ProductCards onClick={(data) => this.addItemsToCart(data)} data={filteredProducts} items={items} />
                    </div>
                </div>

                <div className={`pos-container__container-cart ${isCartOpen ? "open" : ""}`}>
                    <div className="pos-container__cart">
                        <div className="pos-container__cart_heading">
                            <h2>Cart ({totalCartQuantity})</h2>
                            <button type="button" className="pos-container__clear-btn" onClick={this.clearCart}>Clear All</button>
                        </div>

                        <div className="pos-container__cart-body">
                            <div className="pos-container__cart-items">
                                {items.length === 0 ? (
                                    <div className="pos-container__cart-empty">No items in cart.</div>
                                ) : (
                                    items.map((item) => (
                                        <div className="pos-container__cart-item" key={item._id}>
                                            <div className="pos-container__cart-item-details">
                                                <h4>{item?.productName || item?.name}</h4>
                                                <p>PHP {this.getItemPrice(item).toLocaleString()}</p>
                                            </div>
                                            <div className="pos-container__cart-item-actions">
                                                <button type="button" onClick={() => this.decreaseQuantity(item._id)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button type="button" onClick={() => this.increaseQuantity(item._id)}>+</button>
                                                <button type="button" onClick={() => this.removeItem(item._id)}>Remove</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="pos-container__cart-totalization">
                                <Calculator ref={this.calculatorRef} onChange={(value) => this.setState({ amountPaid: value })} />
                                <div className="vip-container">
                                    <h2 className="vip-text">VIP</h2>
                                    <label className="switch">
                                        <input type="checkbox" checked={vipActive} onChange={this.toggleVIP} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                               
                                {vipActive && (
                                    <div className="vip-details">
                                        <div className="vip-id-input-container">
                                            <InputField
                                                number
                                                placeholder="ID Number"
                                                onChange={this.handleIDChange}
                                                value={idNumber}
                                            />
                                            {isCheckingVip && (
                                                <div className="vip-loading-indicator">
                                                    <span className="spinner"></span>
                                                    Checking...
                                                </div>
                                            )}
                                            {vipStatus === 'active' && isVipCardValid && fetchedVipDetails && (
                                                <div className="vip-success-indicator">
                                                    <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <path d="M13.3334 4L5.99999 11.3333L2.66666 8" stroke="#4caf50" strokeWidth="2" strokeLinecap="square"/>
                                                    </svg>
                                                    <div className="vip-member-info">
                                                        <strong>✓ VIP Card Valid!</strong>
                                                        <span>Member: {fetchedVipDetails.firstName || fetchedVipDetails.name || 'N/A'}</span>
                                                        <span>Available Points: {fetchedVipDetails.points || 0}</span>
                                                        <span>Status: {fetchedVipDetails.status}</span>
                                                        {availablePoints > 0 && (
                                                            <span className="points-info">Points will be automatically applied as discount</span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {vipStatus === 'expired' && fetchedVipDetails && (
                                                <div className="vip-expired-indicator">
                                                    <svg className="expired-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <circle cx="8" cy="8" r="7" stroke="#d14a4a" strokeWidth="2"/>
                                                        <path d="M8 4V8L10 10" stroke="#d14a4a" strokeWidth="2" strokeLinecap="square"/>
                                                        <circle cx="8" cy="11" r="0.5" fill="#d14a4a"/>
                                                    </svg>
                                                    <div className="vip-expired-info">
                                                        <strong>⚠ VIP EXPIRED</strong>
                                                        <span>Member: {fetchedVipDetails.firstName || fetchedVipDetails.name || 'N/A'}</span>
                                                        <span>Status: {fetchedVipDetails.status}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {vipStatus === 'invalid' && (
                                                <div className="vip-invalid-indicator">
                                                    <svg className="invalid-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                        <circle cx="8" cy="8" r="7" stroke="#d14a4a" strokeWidth="2"/>
                                                        <path d="M5 5L11 11M11 5L5 11" stroke="#d14a4a" strokeWidth="2" strokeLinecap="square"/>
                                                    </svg>
                                                    <div className="vip-invalid-info">
                                                        <strong>✗ Invalid VIP Card</strong>
                                                        <span>Card number not recognized</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="pos-container__cart-totalization-subtotal">
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p>Subtotal</p>
                                        <p>PHP {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                    
                                    {vipActive && isVipCardValid && discountAmount > 0 && (
                                        <div style={{ display: "flex", justifyContent: "space-between", color: "#4caf50" }}>
                                            <p>Points Discount ({discountAmount} points)</p>
                                            <p>- PHP {discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        </div>
                                    )}
                                    
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p>Amount Paid</p>
                                        <p>PHP {amountPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p>Change</p>
                                        <p style={{ color: change < 0 ? "#d14a4a" : "#4caf50" }}>
                                            PHP {change.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="pos-container__cart-totalization-total">
                                        <p>Total</p>
                                        <p>PHP {finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                </div>
                                <Button
                                    text="Process Order"
                                    maxWidth
                                    success
                                    disabled={items.length === 0 || change < 0 || saleLoading || (vipActive && !isVipCardValid)}
                                    onClick={() => this.processOrder()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default POS;