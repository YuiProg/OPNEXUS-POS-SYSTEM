import React from "react";
import { PanelPage } from "../../components/TRPanelPage/TRPanelPage";
import AuthStore from "../../context/Authstore";
import BranchStore from "../../context/BranchStore";

class Supplier extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        const {setSelectedBranch, selectedBranch} = AuthStore.getState();
        const { branches } = BranchStore.getState();

        const branchNames = branches.map(d=>d.location);
        return (
            <PanelPage 
                user={this.props.user}
                titlePage="Supplier Management"
                subTitle="Manage your suppliers" 
                hasBranch={true}
                branchNames={branchNames} 
                dropDownFunc={(e) => setSelectedBranch(e)}
                selectedBranch={selectedBranch}>
            </PanelPage>
        );
    }
}

export default Supplier;