import React from "react";
import './Logs.css';
import DropDown from "../../components/TRDropDown/Dropdown";
import { Table } from "../../components/TRTable/TrTable";
import TimeInOutStore from "../../context/TimeinOut";
import ModalStore from "../../context/ModalStore";
import AuthStore from "../../context/Authstore";
import toast from "react-hot-toast";
import BranchStore from "../../context/BranchStore";
import SalesStore from "../../context/SalesStore";
import InputField from "../../components/TRInputField/InputFIeld";
import { CalendarDays } from "lucide-react";
import LogStore from "../../context/LogsStore";

class Logs extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedTab: 'system',
            timeInData: [],
            search: '',
            date: '',
            showDateFilter: false
        }
    }

    componentDidMount() {
        const { getBranch } = BranchStore.getState();
        const { getAllData } = TimeInOutStore.getState();
        const { getSales } = SalesStore.getState();
        const { getLogs } = LogStore.getState();
        getLogs();
        getSales();
        getAllData();
        getBranch();

        this.unsubscribe = TimeInOutStore.subscribe((state) => {
            this.setState({timeInData: state.allTimeData});
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    showViewModal = (data) => {
        const { setTimeInModal, setSelectedItem } = ModalStore.getState();
        const { getSingleUser } = AuthStore.getState();
        const { getData } = TimeInOutStore.getState();
        try {
            setTimeInModal(true);
            setSelectedItem(data);
            getSingleUser(data.userId);   
            getData(data.userId);
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    showViewTransactModal = (data) => {
        const { setSelectedItem } = ModalStore.getState();
        const { setSalesModal, fetchSingleSale } = SalesStore.getState();
        setSalesModal(true);
        setSelectedItem(data);
        fetchSingleSale(data.saleId);
    }

    filterByDate = (data, dateField) => {
        const { date } = this.state;
        if (!date) return data;

        const [year, month, day] = date.split('-').map(Number);

        return data.filter((item) => {
            const raw = item[dateField];
            if (!raw) return true;

            const datePart = raw.split(' ')[0].replace(',', '');
            const [m, d, y] = datePart.split('/').map(Number);
            const fullYear = y < 100 ? 2000 + y : y;

            return fullYear === year && m === month && d === day;
        });
    }

    filterBySearch = (data) => {
        const { search } = this.state;
        if (!search) return data;
        return data.filter((item) =>
            Object.values(item).some((val) =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
        );
    }

    clearFilters = () => {
        this.setState({ search: '', date: '' });
    }

    render () { 
        const { timeInLoading } = TimeInOutStore.getState();
        const { branches } = BranchStore.getState();
        const { setSelectedBranch, selectedBranch } = AuthStore.getState();
        const { salesForTable } = SalesStore.getState();
        const { logs } = LogStore.getState();
        const branchNames = branches.map(d => d.location);

        const uniqueUsers = Object.values(
            this.state.timeInData.reduce((acc, record) => {
                if (!acc[record.userId]) {
                    acc[record.userId] = {
                        employeeName: record.employeeName,
                        userId: record.userId,
                        totalHours: 0,
                    };
                }
                acc[record.userId].totalHours += record.totalHours;
                return acc;
            }, {})
        );

        const filteredUniqueUsers = this.filterBySearch(uniqueUsers);
        const filteredSales = this.filterBySearch(this.filterByDate(salesForTable, 'dateAndTime'));
        const filteredLogs = this.filterBySearch(this.filterByDate(logs, 'date'));

        return (
            <>
            <div className="logs-container">
                <div className="logs-top-contents">
                    <div className="logs-header">
                        <h1 className="logs-bigtitle">Activity Logs</h1>
                        <p className="logs-sentence">Track system actions and history.</p>
                    </div>
                    <div className="logs-branch-dropdown">  
                        <p className="logs-branch-text">Branch</p>
                        <DropDown
                            isHeader 
                            className="logs-branch-dd" 
                            defaultValue={selectedBranch ? selectedBranch : "Branch"}
                            onChange={(e) => setSelectedBranch(e)}
                            options={branchNames}
                        />
                    </div>
                </div>
                <div className="logs-main-contents">
                    <div className="logs-filters">
                        <InputField
                            isSearch
                            placeholder="Search"
                            value={this.state.search}
                            onChange={(value) => this.setState({ search: value })}
                        />
                        <button
                            className={`logs-date-filter-toggle ${this.state.showDateFilter ? 'active' : ''}`}
                            onClick={() => this.setState({ showDateFilter: !this.state.showDateFilter })}
                        >
                            <CalendarDays size={16} />
                            Filter by Date
                        </button>
                        {this.state.showDateFilter && (
                            <div className="logs-date-filter-dropdown">
                                <input
                                    type="date"
                                    value={this.state.date}
                                    onChange={(e) => this.setState({ date: e.target.value })}
                                />
                                <button
                                    className="logs-date-filter-clear"
                                    onClick={this.clearFilters}
                                >
                                    Clear
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="logs-table">
                        <div className={`logos-container__buttons`}>
                            <button className={`logos-container__buttons-item ${this.state.selectedTab === 'system' ? 'active' : null}`} onClick={() => this.setState({selectedTab: 'system'})}>System Logs</button>
                            <button className={`logos-container__buttons-item ${this.state.selectedTab === 'time' ? 'active' : null}`} onClick={() => this.setState({selectedTab: 'time'})}>In/Out Logs</button>
                            <button className={`logos-container__buttons-item ${this.state.selectedTab === 'transact' ? 'active' : null}`} onClick={() => this.setState({selectedTab: 'transact'})}>Transaction History</button>
                        </div>
                        {this.state.selectedTab === 'system' 
                            ? (
                                <Table data={filteredLogs} limit={9}/>
                            ) 
                            : this.state.selectedTab === 'time' 
                            ? (
                                <Table data={filteredUniqueUsers} limit={9} isLoading={timeInLoading} onRowSelect={(e) => this.showViewModal(e)}/>
                            ) 
                            : this.state.selectedTab === 'transact' 
                            ? (
                                <Table data={filteredSales} limit={9} onRowSelect={(e) => this.showViewTransactModal(e)}/>
                            ) 
                            : null
                        }
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Logs;