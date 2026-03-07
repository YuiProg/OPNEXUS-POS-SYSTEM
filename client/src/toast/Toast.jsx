import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import './Toast.css';

const Toast = ({ success, error, message, hasButton, func, onClose }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const toastContent = (type, label) => (
        <motion.div
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
        </motion.div>
    );

    if (success) return toastContent("success", "Success! ");
    if (error) return toastContent("error", "Error! ");
    return null;
};

export default Toast;