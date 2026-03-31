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
            // <div className="tr-radio-container">
            //     {options.map((d, i) => {
            //         return(
            //             <>
            //             <input value={d.label.toLowerCase()} key={i} defaultChecked={defaultChecked === d.label} type="radio" name={d.name} onChange={(e) => onChange(e.target.value)}/>
            //             <label key={i + 1}>{d.label}</label>
            //             </>
            //         );
            //     })}
            // </div>
                <div className="settings-demo">
                        <div className="setting-row">
                        <label className="setting-control">
                            <input
                            type="checkbox"
                            checked={this.state.shift}
                            onChange={() =>
                                this.setState((prev) => ({ shift: !prev.shift }))
                            }
                            />
                            <span className="switch switch--shift"></span>
                        </label>

                        <div className="setting-text">
                            <div className="setting-title">Shift</div>
                            <div className="setting-subtitle">Day / Night</div>
                        </div>
                        </div>

                        <div className="setting-row">
                        <label className="setting-control">
                            <input
                            type="checkbox"
                            checked={this.state.availability}
                            onChange={() =>
                                this.setState((prev) => ({
                                availability: !prev.availability,
                                }))
                            }
                            />
                            <span className="switch switch--availability"></span>
                        </label>

                        <div className="setting-text">
                            <div className="setting-title">Availability</div>
                            <div className="setting-subtitle">Offline / Online</div>
                        </div>
                        </div>
                    </div>
        );
    }
}

export default Radio;