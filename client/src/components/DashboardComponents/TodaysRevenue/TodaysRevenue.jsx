import React from "react";
import './TodaysRevenue.css';
import DashboardStore from "../../../context/DashboardStore";

class TodaysRevenue extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            todayRevenue: null,
            todayRevenueLoading: false
        }
    }

    componentDidMount () {
        const { getTodayRevenue } = DashboardStore.getState();
        getTodayRevenue();

        this.unsubscribe = DashboardStore.subscribe(state => {
            this.setState({
                todayRevenue: state.todayRevenue,
                todayRevenueLoading: state.todayRevenueLoading
            });
        });
    }

    componentWillUnmount () {
        if (this.unsubscribe) this.unsubscribe();
    }

    render () {
        const { todayRevenue, todayRevenueLoading } = this.state;

        return (
            <div className="tr-container">
                <div className="tr-content">
                    <p className="tr-label">Today's revenue</p>
                    <h1 className="tr-head">
                        {todayRevenueLoading 
                            ? (
                                <div className="tr-spinner-wrapper">
                                    <div className="tr-spinner" />
                                </div>
                            ) 
                            : (
                                <h1 className="tr-head">
                                    {`PHP ${todayRevenue?.revenue ?? 0}`}
                                </h1>
                            )
                        }
                    </h1>
                    <p className="tr-label">0% from yesterday</p>
                </div>
            </div>
        );
    }
}

export default TodaysRevenue;