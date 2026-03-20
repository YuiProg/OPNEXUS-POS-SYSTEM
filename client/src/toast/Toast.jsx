import React, { useEffect } from "react";
import './Toast.css';

const Toast = ({ success, error, message, hasButton, func, onClose }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const toastContent = (type, label) => (
        <div
            className={`toast ${type}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{scale: 0}}
        >
            <p>{label + message}</p>
            {hasButton && (
                <div>
                    <button onClick={func}>OK</button>
                </div>
            )}
        </div>
    );

    if (success) return toastContent("success", "Success! ");
    if (error) return toastContent("error", "Error! ");
    
    return null;
};

export default Toast;