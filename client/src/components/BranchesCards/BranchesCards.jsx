import React from "react";
import './BranchesCards.css';
import BranchStore from "../../context/BranchStore";
import ModalStore from "../../context/ModalStore";

class BranchesCards extends React.Component {
    constructor (props) {
        super(props);
    }

    viewBranch = (data) => {
        const { setSelectedBranchView } = BranchStore.getState();
        const { setViewBranch } = ModalStore.getState();
        setViewBranch(true);
        setSelectedBranchView(data);
    }

    render () {
        const { data } = this.props;
        const { loading } = BranchStore.getState();

        if (loading) {
            return (
                <div className="branch-cards-loading">
                    <div className="branch-cards-spinner" />
                </div>
            );
        }

        return (
            <>
            {data?.map((data, i) => {
                const hasActiveClerks = data.clerks.some(clerk => clerk.timedIn === "ACTIVE");
                return(
                    <div onClick={() => this.viewBranch(data)} key={i} className={hasActiveClerks ? "branch-card-container active" : "branch-card-container offline"}>
                        <div className="branch-card-details">
                            <h1 className="branch-card-header">{data.location}</h1>
                            <div className="branch-card-button-items">
                                <div>
                                    <p className="branch-card-clerk">Clerks count: {data.clerks.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            </>
        );
    }
}

export default BranchesCards;