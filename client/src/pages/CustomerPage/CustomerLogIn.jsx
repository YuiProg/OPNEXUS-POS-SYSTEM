import React, { useState } from "react";
import "./CustomerLogin.css";
import "../AuthPage/Login.css";
import VipStore from "../../context/VipStore";
import bg_logo from "../../assets/images/loginImageLogo.png";
import toast from "react-hot-toast";


const FB_PAGE_URL = "https://www.facebook.com/profile.php?id=61586551014069"; // Vaporya FACEBOOK PAKKUHA
const FB_QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(FB_PAGE_URL)}`;

const CustomerLogin = () => {
    const [submitted, setSubmitted] = useState(false);
    const [idNumber, setIdNumber] = useState("");
    const [data, setData] = useState(null);
    const { vipLoading } = VipStore.getState();

    const formatDate = (isoString) => {
        if (!isoString) return "N/A";
        return new Date(isoString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getExpirationDate = (isoString) => {
        if (!isoString) return "N/A";
        const date = new Date(isoString);
        date.setFullYear(date.getFullYear() + 1);
        return formatDate(date.toISOString());
    };

    const getFullName = (vip) => {
        return [vip.firstName, vip.middleName, vip.lastName]
            .filter(Boolean)
            .join(" ");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { getVipById } = VipStore.getState();
        const result = await getVipById(idNumber);

        if (!result || (Array.isArray(result) && result.length === 0)) {
            toast.error("No VIP registered with this ID");
            return;
        }

        setData(result);
        setSubmitted(true);
    };

    const isActive = String(data?.status || "").toUpperCase() === "ACTIVE";

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
                            <img src={bg_logo} alt="VIP Logo" />
                        </div>

                        <h2 className="vip-login-title">Customer VIP Log In</h2>
                        <p className="vip-login-subtitle">
                            Enter your ID number to view your VIP membership details.
                        </p>

                        <form onSubmit={handleSubmit} className="vip-login-form">
                            <input
                                type="text"
                                maxLength={4}
                                placeholder="Enter ID Number"
                                value={idNumber}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        setIdNumber(value);
                                    }
                                }}
                                className="vip-login-input"
                                required
                            />

                            <button type="submit" className="vip-login-button">
                                Login
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="vip-login-details">
                        <h2 className="vip-login-title">VIP Member Details</h2>

                        <div className="vip-login-info-grid">
                            <div className="vip-login-info-row">
                                <span className="vip-login-label">Name</span>
                                <span className="vip-login-value">{getFullName(data)}</span>
                            </div>

                            <div className="vip-login-info-row">
                                <span className="vip-login-label">ID Number</span>
                                <span className="vip-login-value">{data._id}</span>
                            </div>

                            <div className="vip-login-info-row">
                                <span className="vip-login-label">Email</span>
                                <span className="vip-login-value">{data.email}</span>
                            </div>

                            <div className="vip-login-info-row">
                                <span className="vip-login-label">Contact No.</span>
                                <span className="vip-login-value">{data.contactNo}</span>
                            </div>

                            <div className="vip-login-info-row">
                                <span className="vip-login-label">Points</span>
                                <span className="vip-login-value">{data.points}</span>
                            </div>

                            <div className="vip-login-info-row">
                                <span className="vip-login-label">Status</span>
                                <span
                                    className={`vip-login-value vip-login-status ${
                                        isActive ? "vip-login-status-active" : "vip-login-status-inactive"
                                    }`}
                                >
                                    {data.status}
                                </span>
                            </div>

                            <div className="vip-login-info-row">
                                <span className="vip-login-label">VIP Card Registered</span>
                                <span className="vip-login-value">{formatDate(data.createdAt)}</span>
                            </div>

                            <div className="vip-login-info-row">
                                <span className="vip-login-label">VIP Card Expiration</span>
                                <span className="vip-login-value">{getExpirationDate(data.createdAt)}</span>
                            </div>
                        </div>

                        <div className="vip-login-qr-section">
                            <span className="vip-login-label vip-login-qr-label">
                                Follow our Facebook page
                            </span>
                            <img
                                src={FB_QR_URL}
                                alt="Facebook Page QR Code"
                                className="vip-login-qr-image"
                            />
                        </div>

                        <div className="vip-login-actions">
                            <button
                                type="button"
                                className="vip-login-button vip-login-button-secondary"
                                onClick={() => {
                                    setSubmitted(false);
                                    setIdNumber("");
                                    setData(null);
                                }}
                                disabled={vipLoading}
                            >
                                Back
                            </button>

                            <a
                                href={FB_PAGE_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="vip-login-button vip-login-fb-button"
                            >
                                Go to FB Page
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerLogin;