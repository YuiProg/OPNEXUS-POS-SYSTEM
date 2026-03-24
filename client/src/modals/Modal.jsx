import React from "react";

export class Modal extends React.Component {
    constructor (props) {
        super(props);
    }

    passPropsToChild = () => {
        const {confirm} = this.props;

        const passchildren = React.Children.map(this.props.children, (child) => {
            if (!child) return null;
            return React.cloneElement(child, {
                confirm
            });
        });

        return passchildren;
    }

    render () {
        return (
            <div>
                {this.passPropsToChild()}
            </div>
        );
    }
}