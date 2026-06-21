import React from "react";
import AuthStore from "../../context/Authstore";
import Strings from "../../strings/strings-codes";
import { Navigate, Link } from "react-router-dom";
import './Sidebar.css';
import { LayoutDashboard, ShelvingUnit, IdCardLanyard, Logs, Warehouse, Store, Clock, Gem, Monitor, GitBranch, Settings } from 'lucide-react';
import Button from "../TRButton/Button";
import SettingsStore from "../../context/SettingsStore";

const { SUCCESS_MESS } = Strings;

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            user: null,
            storeState: SettingsStore.getState(),
        };
    }

    componentDidMount() {
        this.unsubscribe = SettingsStore.subscribe(() => {
            this.setState({ storeState: SettingsStore.getState() })
        })
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    handleLogout = () => {
        const { logoutUser } = AuthStore.getState();
        logoutUser();
    }

    checkAuthentication = () => {

    }

    passProps = () => {
        const { user } = this.props;

        const enhancedChildren = React.Children.map(this.props.children, (child) => {
            if (!child) return;
            return React.cloneElement(child, {
                user
            }); 
        });

        return enhancedChildren;
    }

    render() {
        const { user } = this.props;
        const { settings } = this.state.storeState;
        const settingsData = settings?.data;

        const staffEnabled = settingsData?.staffManagementSettings?.enabled ?? true;
        const vipEnabled = settingsData?.vipManagementSettings?.enabled ?? true;
        const branchEnabled = settingsData?.branchSettings?.enabled ?? true;

        const sidebarItemsAdmin = [
            {
                title: "Dashboard",
                icon: <LayoutDashboard />,
                link: "/dashboard",
            },
            {
                title: "Inventory",
                icon: <ShelvingUnit />,
                link: "/inventory",
            },
            staffEnabled && {
                title: "Staff Management",
                icon: <IdCardLanyard />,
                link: "/staff",
            },
            vipEnabled && {
                title: "VIP Management",
                icon: <Gem />,
                link: "/vip",
            },
            branchEnabled && {
                title: "Branches",
                icon: <Warehouse/>,
                link: "/branch",
            },
            {
                title: "Logs",
                icon: <Logs />,
                link: "/logs",
            },
            {
                title: "Settings",
                icon: <Settings/>,
                link: "/settings"
            },
        ].filter(Boolean)

        const sidebarItemsClerk = [
            {
                title: "Time In / Out",
                icon: <Clock />,
                link: "/timeinout",
            },
            vipEnabled && {
                title: "VIP Management",
                icon: <Gem />,
                link: "/vip",
            },
            {
                title: "Inventory",
                icon: <ShelvingUnit />,
                link: "/inventory",
            },
            {
                title: "POS",
                icon: <Store/>,
                link: "/pos"
            }
        ].filter(Boolean)

        return (
            <div className="sidebar-container">
                <aside className="sidebar-aside">
                    <img loading="lazy" fetchPriority="high" src="https://i.imgur.com/4hfuK5S.png" alt="logo" className="logo"/>
                    <div className="sidebar-below-container">
                        <ul className="sidebar-list">
                            {user.role.toLowerCase() === 'admin' ? (
                                sidebarItemsAdmin.map((l,i) => {
                                    return (
                                        <li key={i} className="row" id={window.location.pathname === l.link ? "active" : ""}>
                                            <Link to={l.link}>
                                                <div className="sb-icon">{l.icon}</div>
                                                <div className="sb-title">{l.title}</div>
                                            </Link>
                                        </li>
                                    );
                                })
                            ) : user.role.toLowerCase() === 'clerk' ? (
                                sidebarItemsClerk.map((l,i) => {
                                    return (
                                        <li key={i} className="row" id={window.location.pathname == l.link ? "active" : ""}>
                                            <Link to={l.link}>
                                                <div className="sb-icon">{l.icon}</div>
                                                <div className="sb-title">{l.title}</div>
                                            </Link>
                                        </li>
                                    );
                                })
                            ) : null}
                        </ul>
                        <div className="user-panel">
                            {this.props.user.role.toLowerCase() === "clerk" && this.props.user.time && (
                                <div className="user-clock-in-container">
                                    <div className="user-clock-in-details">
                                        <Clock className="clock-icon"/>
                                        <div className="user-clock-in-texts">
                                            <p className="clock-label">Clocked in at</p>
                                            <p className="clock-value">{this.props.user.time}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {this.props.user ? (
                                <>
                                <p className="userName">{user.username}</p>
                                <p className="userRole">{user.role}</p>
                                </>
                            ) : <p>LOADING ...</p>}
                            <a className="change-password" onClick={() => AuthStore.getState().setChangePasswordModal(true)}>
                                Change password
                            </a>
                            <Button error maxWidth text="LOG OUT" onClick={() => this.handleLogout()}/>
                        </div>
                    </div>
                </aside>
                <main className="children">
                    {this.passProps()}
                </main>
            </div>
        );
    }
}

export default Sidebar;