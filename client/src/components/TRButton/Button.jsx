import PropTypes from "prop-types";
import React from "react";
import './Button.css';

class Button extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        const {
            success,
            error,
            warning,
            maxWidth,
            customWidth,
            submit,
            text,
            onClick,
            disabled
        } = this.props;

        return (
            <button 
                type={`${submit ? 'submit' : 'button'}`} 
                style={{
                    background: `${
                        success ? "#22C55E" 
                        : warning ? "#F59E0B" 
                        : error ? "#EF4444" 
                        : "transparent"}`,
                    width: `${
                        maxWidth ? "100%" 
                        : customWidth ? customWidth 
                        : "auto"
                    }`
                }}
                className={`TR-button ${disabled && 'tr-btn-disabled'}`}
                onClick={() => onClick()}
                disabled={disabled}
            >
                {text}
            </button>
        );
    }
}

Button.propTypes = {
    success: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
    maxWidth: PropTypes.bool,
    customWidth: PropTypes.number,
    submit: PropTypes.bool,
    text: PropTypes.string,
    onClick: PropTypes.bool,
    disabled: PropTypes.bool
}

export default Button;