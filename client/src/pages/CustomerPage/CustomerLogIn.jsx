import React from "react";
import './CustomerLogin.css';
import '../AuthPage/Login.css';
class CustomerLogin extends React.Component {
    render() {
        return (
            <div>
                <div className="login-container__marquee" aria-hidden="true">
                    {Array.from({ length: 20 }).map((_, rowIndex) => (
                        <div key={rowIndex} className="login-container__marquee-row">
                            <div className="login-container__marquee-track">
                                <span>RELX JUICE</span>
                                <span>XULTRA JUICE</span>
                                <span>PUFFS BLACK</span>
                                <span>VAPE FLAVOR</span>
                                <span>CLOUD CART</span>
                                <span>RELX JUICE</span>
                                <span>XULTRA JUICE</span>
                                <span>PUFFS BLACK</span>
                                <span>VAPE FLAVOR</span>
                                <span>CLOUD CART</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default CustomerLogin;