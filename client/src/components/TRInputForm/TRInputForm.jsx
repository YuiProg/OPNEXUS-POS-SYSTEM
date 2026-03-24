import React from "react";
import './TRInputForm.css';


//dito lalagay mga inputfields parang panel tong una
export class TRInputFormPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { header, subHeader, onSubmit } = this.props;

        //pang pasa ng props dito sa parent sa child (parent props -> children)
        const enhancedChildren = React.Children.map(this.props.children, (child) => {
            if (!child) return null;
            return React.cloneElement(child, {
                onSubmit,          
                header,
                subHeader
            });
        });

        return (
            <div className="tr-inputform-panel-container">
                <div className="tr-inputform-panel-headers">
                    <h1 className="tr-header">{header}</h1>
                    <p className="tr-subheader">{subHeader}</p>
                </div>
                <div>
                    {enhancedChildren}
                </div>
            </div>
        );
    }
}


export class InputForm extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {onSubmit} = this.props;
        return (
            <form className="tr-inputform" onSubmit={(e) => onSubmit(e)}>
                {this.props.children}
                <button className="tr-inputform-submit" type="submit">SUBMIT</button>
            </form>
        );
    }
}

export class InputRow extends React.Component {
    constructor (props) {
        super(props);
    }  

    render () {
        const { gap, titles } = this.props;
        const children = React.Children.toArray(this.props.children);

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