import React from "react";
import './Modal.css';
import { BadgeCheck, Check } from "lucide-react";
import Button from "../components/TRButton/Button";

export class Modal extends React.Component {
    constructor (props) {
        super(props);
    }

    passPropsToChild = () => {
        const {confirm, required, hasCancel, onCancel} = this.props;

        const passchildren = React.Children.map(this.props.children, (child) => {
            if (!child) return null;
            return React.cloneElement(child, {
                confirm,
                required,
                hasCancel,
                onCancel
            });
        });

        return passchildren;
    }

    render () {
        const {
            header,
            subHeader,
            onClose
        } = this.props;
        return (
            <div className="modal-container" onClick={() => onClose()}>
                <div className="modal-child" onClick={(e) => e.stopPropagation()}>
                    {header && (
                        <div className="modal-p-header">
                            <h1 className="modal-p-h">{header}</h1>
                            <p className="modal-p-sh">{subHeader}</p>
                        </div>
                    )}
                    {this.passPropsToChild()}
                </div>
            </div>
        );
    }
}

export class ModalConfim extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isClosing: false
        };
    }

    handleClose = () => {
        this.setState({ isClosing: true });
        setTimeout(() => {
            this.props.onClose();
        }, 300);
    }

    render () {
        const {
            message,
            onClose
        } = this.props;
        const { isClosing } = this.state;

        return (
            <div className={`modal-container-confirm ${isClosing ? 'closing' : ''}`}>
                <div className="" onClick={(e) => e.stopPropagation()}>
                    {/* CHECK MARK */}
                    <div className={`modal-container-confirm ${isClosing ? 'closing' : ''}`}>
                        <div className="modal-confirm-green-circle">
                            <Check size={80}/>
                        </div>
                        <h1 className="modal-confirm-header">{message}</h1>
                        <Button success maxWidth text="OKAY" onClick={() => onClose()}/>
                    </div>
                </div>
            </div>
        );
    }
}

export class ModalError extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>

            </div>
        );
    }
}

