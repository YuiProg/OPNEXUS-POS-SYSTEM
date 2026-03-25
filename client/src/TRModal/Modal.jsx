import React from "react";
import './Modal.css';

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
            subHeader
        } = this.props;
        return (
            <div className="modal-container" onClick={() => this.props.onClose()}>
                <div className="modal-child" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-p-header">
                        <h1 className="modal-p-h">{header}</h1>
                        <p className="modal-p-sh">{subHeader}</p>
                    </div>
                    {this.passPropsToChild()}
                </div>
            </div>
        );
    }
}

export class ModalConfim extends React.Component {
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

