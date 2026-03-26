import React from "react";
import './Branches.css';
import DropDown from "../../components/TRDropDown/Dropdown";
import BranchesCards from "../../components/BranchesCards/BranchesCards";
import Radio from "../../components/TRRadio/Radio";
import Button from "../../components/TRButton/Button";

class Branches extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        const options= [
            {label: 'Active', name: 'choice'},
            {label: 'Offline', name: 'choice'}
        ];

        return (
            <div className="bm-container">
                <div className="bm-top-contents">
                    <div className="bm-header">
                        <h1 className="bm-bigtitle">Branch Monitoring</h1>
                        <p className="bm-sentence">See which branches are active and inactive.</p>
                    </div>
                </div>
                {/* BRANCHES CARDS */}
                <div className="branches-cards-container">
                    <div className="branches-radio-container">
                        <Radio options={options} defaultChecked="Active" onChange={value => console.log(value)}/>
                        <Button cancel text="+ New Branch"/>
                    </div>
                    <BranchesCards/>
                </div>
            </div>
        );
    }
}

export default Branches;