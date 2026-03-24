import React from "react";
import './TRInputForm.css';
import PropTypes from "prop-types";


//dito lalagay mga inputfields parang panel tong una
export class TRInputFormPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    passPropsToChildren = () => {
        const { header, subHeader, onSubmit, required } = this.props;

        //pang pasa ng props dito sa parent sa child (parent props -> children)
        const enhancedChildren = React.Children.map(this.props.children, (child) => {
            if (!child) return null;
            return React.cloneElement(child, {
                onSubmit,          
                header,
                subHeader,
                required
            });
        });

        return enhancedChildren;
    }

    render() {
        const { header, subHeader } = this.props;

        return (
            <div className="tr-inputform-panel-container">
                <div className="tr-inputform-panel-headers">
                    <h1 className="tr-header">{header}</h1>
                    <p className="tr-subheader">{subHeader}</p>
                </div>
                <div>
                    {this.passPropsToChildren()}
                </div>
            </div>
        );
    }
}


export class InputForm extends React.Component {
    constructor (props) {
        super(props);
    }

    passPropsToChildren = () => {
        const { onSubmit, required } = this.props;

        const enhancedChildren = React.Children.map(this.props.children, (child) => {
            if (!child) return null;
            return React.cloneElement(child, {
                onSubmit,          
                required
            });
        });

        return enhancedChildren;
    }

    render () {
        const {onSubmit} = this.props;
        return (
            <form className="tr-inputform" onSubmit={(e) => onSubmit(e)}>
                {this.passPropsToChildren()}
                <button className="tr-inputform-submit" type="submit">SUBMIT</button>
            </form>
        );
    }
}

export class InputRow extends React.Component {
    constructor (props) {
        super(props);
    }  

    passPropsToChildren = () => {
        const { required, gap } = this.props;
        
        const enhancedChildren = React.Children.map(this.props.children, (child) => {
            if (!child) return null;
            return React.cloneElement(child, {
                gap,
                required
            });
        });

        return enhancedChildren;
    }

    render () {
        const { gap, titles } = this.props;
        const children = React.Children.toArray(this.passPropsToChildren());

        return (
            <div className="tr-inputrow" style={{ gap: `${gap}px` }}>
                {children.map((child, i) => (
                    <div className="tr-inputrow-field" key={i}>
                        {titles
                            ? <p className="tr-inputrow-title">{titles[i]}</p>
                            : <span className="tr-inputrow-title-spacer" />
                        }
                        {child}
                    </div>
                ))}
            </div>
        );
    }
}

TRInputFormPanel.propTypes = {
    header: PropTypes.string,
    subHeader: PropTypes.string,
    onSubmit: PropTypes.func
}

InputForm.propTypes = {
    onSubmit: PropTypes.func
}

InputRow.propTypes = {
    gap: PropTypes.number,
    titles: PropTypes.array
}