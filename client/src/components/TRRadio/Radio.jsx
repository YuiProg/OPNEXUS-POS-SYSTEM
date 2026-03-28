import React from "react";
import './Radio.css'

class Radio extends React.Component {
    constructor (props) {
       super(props); 
       this.state = {
        value: null
       }
    }

    render () {

        const {
            options,
            onChange,
            defaultChecked
        } = this.props;

        return (
            <div className="tr-radio-container">
                {options.map((d, i) => {
                    return(
                        <>
                        <input value={d.label.toLowerCase()} key={i} defaultChecked={defaultChecked === d.label} type="radio" name={d.name} onChange={(e) => onChange(e.target.value)}/>
                        <label key={i + 1}>{d.label}</label>
                        </>
                    );
                })}
            </div>
        );
    }
}

export default Radio;