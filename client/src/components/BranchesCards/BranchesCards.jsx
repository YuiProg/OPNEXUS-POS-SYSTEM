import React from "react";
import './BranchesCards.css';

class BranchesCards extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        const sampleData = [
            {location: 'Longos', clerk: 'Riki', shift: 'morning', session: '2h', active: true},
            {location: 'Gatbuca', clerk: 'Riki', shift: 'morning', session: 'n/a', active: false},
            {location: 'Longos', clerk: 'Riki', shift: 'morning', session: '2h', active: true},
            {location: 'Longos', clerk: 'Riki', shift: 'morning', session: '2h', active: true},
            {location: 'Longos', clerk: 'Riki', shift: 'morning', session: '2h', active: true},
            {location: 'Longos', clerk: 'Riki', shift: 'morning', session: '2h', active: true}
        ];

        
        const {
            // eslint-disable-next-line no-unused-vars
            data
        } = this.props;

        return (
            <>
            {sampleData.map((data, i) => {
                return(
                    <div key={i} className={data.active ? "branch-card-container active" : "branch-card-container offline"}>
                        <h1 className="branch-card-header">{data.location}</h1>
                        <div className="branch-card-button-items">
                            <div>
                                <p className="branch-card-clerk">Clerk</p>
                                <h3 className="branch-card-clerk-header">{data.clerk}</h3>
                            </div>
                            <div>
                                <p className="branch-card-clerk">Session</p>
                                <h3 className="branch-card-clerk-header">{data.session}</h3>
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