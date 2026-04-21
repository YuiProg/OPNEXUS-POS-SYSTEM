import React, { useState } from "react";
import "./CustomerLogin.css";
import "../AuthPage/Login.css";

const CustomerLogin = () => {
    const [submitted, setSubmitted] = useState(false);
    const [idNumber, setIdNumber] = useState("");

    const customerData = {
        name: "Juan Dela Cruz",
        idNumber: "VIP-2026-00124",
        vipCardRegistered: "Yes",
        vipCardExpiration: "December 31, 2026",
        fbPageUrl: "https://www.facebook.com/",
        qrCodeImage:
            "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://www.facebook.com/",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="vip-login-page">
            <div className="vip-login-marquee" aria-hidden="true">
                {Array.from({ length: 18 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="vip-login-marquee-row">
                        <div className="vip-login-marquee-track">
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

            <div className="vip-login-card">
                {!submitted ? (
                    <>
                        <div className="vip-login-logo">
                            <div className="vip-login-logo-circle">V</div>
                        </div>

                        <h2 className="vip-login-title">Customer VIP Log In</h2>

                        <form onSubmit={handleSubmit} className="vip-login-form">
                            <input
                                type="text"
                                placeholder="Enter ID Number"
                                value={idNumber}
                                onChange={(e) => setIdNumber(e.target.value)}
                                className="vip-login-input"
                            />

                            <button type="submit" className="vip-login-button">
                                Login
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="vip-login-details">
                        <h2 className="vip-login-title">VIP Member Details</h2>

                        <div className="vip-login-info-row">
                            <span className="vip-login-label">Name</span>
                            <span className="vip-login-value">{customerData.name}</span>
                        </div>

                        <div className="vip-login-info-row">
                            <span className="vip-login-label">ID Number</span>
                            <span className="vip-login-value">{customerData.idNumber}</span>
                        </div>

                        <div className="vip-login-info-row">
                            <span className="vip-login-label">VIP Card Registered</span>
                            <span className="vip-login-value">{customerData.vipCardRegistered}</span>
                        </div>

                        <div className="vip-login-info-row">
                            <span className="vip-login-label">VIP Card Expiration</span>
                            <span className="vip-login-value">{customerData.vipCardExpiration}</span>
                        </div>

                        <div className="vip-login-qr-section">
                            <p className="vip-login-label vip-login-qr-label">QR Code for FB Page</p>
                            <img
                                src={customerData.qrCodeImage}
                                alt="Facebook Page QR Code"
                                className="vip-login-qr-image"
                            />
                        </div>

                        <a
                            href={customerData.fbPageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="vip-login-button vip-login-fb-button"
                        >
                            Open FB Page
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerLogin;