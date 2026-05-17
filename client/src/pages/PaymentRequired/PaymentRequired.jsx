import React from 'react'
import './PaymentRequired.css'

const PaymentRequired = () => {
  return (
    <div className="payment-error-container">
      <div className="payment-error-content">
        <div className="lock-loader">
          <div className="lock-icon-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 100 120"
              className="lockIcon"
            >
              <rect
                x="12"
                y="52"
                width="76"
                height="56"
                rx="8"
                strokeWidth="7"
                stroke="black"
                fill="rgba(98, 65, 142, 0.15)"
              />
              <path
                d="M28 52V36C28 19.431 41.431 6 58 6C74.569 6 88 19.431 88 36V52"
                strokeWidth="7"
                stroke="black"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="50" cy="76" r="8" fill="#C4161C" />
              <line
                x1="50"
                y1="84"
                x2="50"
                y2="96"
                strokeWidth="6"
                stroke="#C4161C"
                strokeLinecap="round"
              />
            </svg>
            <div className="pulse-ring"></div>
          </div>
          <div className="barContainer">
            <span className="bar"></span>
            <span className="bar bar2"></span>
          </div>
        </div>

        <p className="payment-error-title">Access Disabled</p>
        <p className="payment-error-sub">
          Your system usage has expired or is unpaid.<br />
          Please complete your payment to restore access.
        </p>
      </div>
    </div>
  )
}

export default PaymentRequired