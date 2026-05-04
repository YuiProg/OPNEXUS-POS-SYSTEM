import React from "react";
import './TRPanelPage.css';
import DropDown from "../TRDropDown/Dropdown";

class PanelPage extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        const {
            titlePage,
            subTitle,
            selectedBranch,
            dropDownFunc,
            branchNames,
            user,
            hasBranch
        } = this.props;

        return (
            <div className="tr-panel-container">
                <div className="tr-panel-top-contents">
                    <div className="tr-panel-header">
                        <h1 className="tr-panel-bigtitle">{titlePage}</h1>
                        <p className="tr-panel-sentence">{subTitle}</p>
                    </div>
                    {hasBranch && (
                    <div className="iv-branch-dropdown">
                        {user.role !== 'Clerk' && (
                        <>
                        <p className="iv-branch-text">Branch</p>
                        <DropDown 
                            isHeader
                            className="iv-branch-dd" 
                            defaultValue={selectedBranch ? selectedBranch : "Branch"}
                            onChange={(e) => dropDownFunc(e)}
                            options={branchNames}
                        />
                        </>
                        )}
                    </div>
                    )}
                </div>
                
                {this.props.children}
            </div>
        );
    }
}

export default PanelPage;