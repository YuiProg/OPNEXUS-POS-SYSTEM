import React from "react";
import './ScreenLoading.css';

class ScreenLoading extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { message = "Loading..." } = this.props;

        return (
            <div className="screenloading">
                <div className="screenloading__card">
                    <div className="screenloading__spinner" />
                    {message && <p className="screenloading__text">{message}</p>}
                </div>
            </div>
        );
    }
}

export default ScreenLoading;