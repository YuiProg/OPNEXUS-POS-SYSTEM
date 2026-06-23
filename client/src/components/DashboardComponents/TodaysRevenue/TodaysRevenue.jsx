import React from "react";
import './TodaysRevenue.css';
import { DollarSign } from 'lucide-react';
import DashboardStore from "../../../context/DashboardStore";

class TodaysRevenue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todayRevenue: null,
            todayRevenueLoading: false
        };
    }

    componentDidMount() {
        const { getTodayRevenue } = DashboardStore.getState();
        getTodayRevenue();
        
        this.unsubscribe = DashboardStore.subscribe(state => {
            this.setState({
                todayRevenue: state.todayRevenue,
                todayRevenueLoading: state.todayRevenueLoading
            });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2
        }).format(amount || 0);
    }

    render() {
        const { todayRevenue, todayRevenueLoading } = this.state;

        return (
            <div className="tr-container">
                <div className="tr-content">
                    <span className="tr-label">Today's Revenue</span>
                    {todayRevenueLoading ? (
                        <div className="tr-spinner-wrapper">
                            <div className="tr-spinner" />
                        </div>
                    ) : (
                        <h1 className="tr-head">
                            {this.formatCurrency(todayRevenue?.revenue)}
                        </h1>
                    )}
                </div>
                <div className="tr-icon-box">
                    <DollarSign size={22} strokeWidth={2.5} />
                </div>
            </div>
        );
    }
}

export default TodaysRevenue;