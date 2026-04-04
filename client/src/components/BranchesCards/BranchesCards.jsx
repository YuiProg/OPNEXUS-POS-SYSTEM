import React from "react";
import './BranchesCards.css';

class BranchesCards extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        // const sampleData = [
        //     {location: 'Longos', clerk: 'Riki', shift: 'morning', session: '2h', active: true},
        //     {location: 'Gatbuca', clerk: 'Riki', shift: 'morning', session: 'n/a', active: false},
        //     {location: 'Longos', clerk: 'Riki', shift: 'morning', session: '2h', active: true},
        //     {location: 'Longos', clerk: 'Riki', shift: 'morning', session: '2h', active: true},
        //     {location: 'Longos', clerk: 'Riki', shift: 'morning', session: '2h', active: true},
        //     {location: 'Longos', clerk: 'Riki', shift: 'morning', session: '2h', active: true}
        // ];

        
        const {
            data
        } = this.props;
        console.log(data);
        return (
            <>
            {data?.map((data, i) => {
                return(
                    <div key={i} className={data.active ? "branch-card-container active" : "branch-card-container offline"}>
                        <div className="branch-card-details">
                            <h1 className="branch-card-header">{data.location}</h1>
                            <div className="branch-card-button-items">
                                <div>
                                    <p className="branch-card-clerk">Clerks count: {data.clerks.length}</p>
                                </div>
                                {/* <div>
                                    <p className="branch-card-clerk">Session</p>
                                    <h3 className="branch-card-clerk-header">{data.session}</h3>
                                </div> */}
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