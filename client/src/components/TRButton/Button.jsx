import PropTypes from "prop-types";
import React from "react";
import './Button.css';

/**
 * @class
 * @component
 */
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
            disabled,
            cancel,
            className,
            customBorder
        } = this.props;

        // Fallback to primary corporate blue (#2563eb) if no status prop is provided
        const getBackgroundColor = () => {
            if (success) return "#22C55E";
            if (warning) return "#F59E0B";
            if (error) return "#EF4444";
            if (cancel) return "transparent";
            return "#2563eb"; // Modern corporate default blue
        };

        return (
            <div style={{ width: maxWidth ? "100%" : "auto" }}>
                <button 
                    type={submit ? 'submit' : 'button'} 
                    style={{
                        background: getBackgroundColor(),
                        width: maxWidth ? "100%" : customWidth ? `${customWidth}px` : "auto",
                        border: customBorder ? customBorder : cancel ? "1px solid #e2e8f0" : "none"
                    }}
                    className={`TR-button ${disabled ? 'tr-btn-disabled' : ''} ${className || ''}`}
                    onClick={(e) => onClick && onClick(e)}
                    disabled={disabled}
                >
                    {text}
                </button>
            </div>
        );
    }
}

Button.propTypes = {
    primary: PropTypes.bool,
    success: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
    maxWidth: PropTypes.bool,
    customWidth: PropTypes.number,
    submit: PropTypes.bool,
    text: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    cancel: PropTypes.bool,
    className: PropTypes.string,
    customBorder: PropTypes.string
}

export default Button;