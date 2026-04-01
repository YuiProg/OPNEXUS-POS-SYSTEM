import React from "react";
import './Branches.css';
import DropDown from "../../components/TRDropDown/Dropdown";
import BranchesCards from "../../components/BranchesCards/BranchesCards";
import Radio from "../../components/TRRadio/Radio";
import Button from "../../components/TRButton/Button";
import BranchStore from "../../context/BranchStore";
import AuthStore from "../../context/Authstore";

class Branches extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            branches: []
        }
    }

    componentDidMount () {
        const {fetchUsers} = AuthStore.getState();
        const { getBranch } = BranchStore.getState();
        fetchUsers();
        getBranch();
        this.unsubscribe = BranchStore.subscribe((state) => {
            const branch = state.branches;
            this.setState({branches: branch});
        });
    }

    componentWillUnmount () {
        if (this.unsubscribe) this.unsubscribe;
    }

    render () {
        const { setShowModal } = BranchStore.getState();

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
                <div className="branches-cards-activity">
                    <div className="branches-radio-container">
                        <Radio options={options} defaultChecked="Active" onChange={value => console.log(value)}/>
                        <Button error text="NEW BRANCH" onClick={() => setShowModal(true)}/>
                    </div>
                </div>
                <div className="branches-cards-container">
                    <BranchesCards data={this.state.branches}/>
                </div>
            </div>
        );
    }
}

export default Branches;