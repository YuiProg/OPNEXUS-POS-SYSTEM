import React from "react";
import "./Branches.css";
import BranchesCards from "../../components/BranchesCards/BranchesCards";
import Radio from "../../components/TRRadio/Radio";
import Button from "../../components/TRButton/Button";
import BranchStore from "../../context/BranchStore";
import AuthStore from "../../context/Authstore";

class Branches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branches: [],
            filters: {  
                availability: null, 
            },
        };
    }

    componentDidMount() {
        const { fetchUsers } = AuthStore.getState();
        const { getBranch } = BranchStore.getState();

        fetchUsers();
        getBranch();

        this.unsubscribe = BranchStore.subscribe((state) => {
            this.setState({ branches: state.branches || [] });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    handleFilterChange = (type, value) => {
        this.setState((prevState) => ({
            filters: {
                ...prevState.filters,
                [type]: prevState.filters[type] === value ? null : value,
            },
        }));
    };

    getFilteredBranches = () => {
        const { branches, filters } = this.state;
        const { availability } = filters;

        return branches.filter((branch) => {
            if (availability === null) return true;

            const isActive = branch.clerks?.some(clerk => clerk.timedIn === "ACTIVE");

            if (availability === "ACTIVE") return isActive;
            if (availability === "INACTIVE") return !isActive;
            return true;
        });
    };

    viewModal = () => {
        const { setShowModal, setSelectedUsers } = BranchStore.getState();
        const { fetchUsers } = AuthStore.getState();
        fetchUsers();
        setSelectedUsers([]);
        setShowModal(true);
    }

    render() {
        const filteredBranches = this.getFilteredBranches();

        return (
            <div className="bm-container">
                <div className="bm-top-contents">
                    <div className="bm-header">
                        <h1 className="bm-bigtitle">Branch Monitoring</h1>
                        <p className="bm-sentence">
                            See which branches are active and inactive.
                        </p>
                    </div>
                </div>

                <div className="branches-cards-activity">
                    <div className="branches-radio-container">
                        <Radio
                            filters={this.state.filters}
                            onFilterChange={this.handleFilterChange}
                        />
                        <Button
                            error
                            text="NEW BRANCH"
                            onClick={() => this.viewModal()}
                        />
                    </div>
                </div>

                <div className="branches-cards-container">
                    <BranchesCards data={filteredBranches} />
                </div>
            </div>
        );
    }
}

export default Branches;