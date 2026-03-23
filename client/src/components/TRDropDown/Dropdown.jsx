import React from "react";
import './Dropdown.css'
import { Layers } from 'lucide-react';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { 
        options, 
        defaultValue, 
        onChange
    } = this.props;

    return (
        <div className="tr-dropdown-wrapper">
            <Layers className="tr-dropdown-icon" />
            <select className="tr-dropdown" onChange={(e) => onChange(e.target.value)} defaultValue={defaultValue || 'Select item'}>
                <option className="tr-options" disabled>
                    Select item
                </option>
                {options?.map((l, i) => {
                    return(
                        <option className="tr-options" key={i} value={l}>{l}</option>
                    );
                })}
            </select>
        </div>
    );
  }
}

export default DropDown;