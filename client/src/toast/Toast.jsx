import React, { useEffect } from "react";

const Toast = ({success, error, message, hasButton, CB, onClose }) => {

    useEffect(() => {
        
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const successToast = () => {
        return (
            <div className="toast">
                <p>{'Sucess! ' + message}</p>
                {hasButton && (
                    <div>
                        <button onClick={CB}>OK</button>
                    </div>
                )}
            </div>
        );
    }

    const errorToast = () => {
        return (
            <div className="toast">
                <p>{'Error! ' + message}</p>
                {hasButton && (
                    <div>
                        <button onClick={CB}>OK</button>
                    </div>
                )}
            </div>
        );
    }

    if (success) {
        return successToast();
    } else if (error) {
        return errorToast();
    }
};

export default Toast;