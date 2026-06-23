import React from "react";
import AuthStore from "../../context/Authstore";
import { Link } from "react-router-dom";
import './Sidebar.css';
import {
    LayoutDashboard, Package, IdCard, Gem, Warehouse,
    ClipboardList, Settings, Clock, Store, LogOut, Menu, ChevronDown
} from 'lucide-react';
import SettingsStore from "../../context/SettingsStore";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            logsExpanded: false,
            inventoryExpanded: false,
            storeState: SettingsStore.getState(),
        };
    }

    componentDidMount() {
        this.unsubscribe = SettingsStore.subscribe(() => {
            this.setState({ storeState: SettingsStore.getState() });
        });

        const pathname = window.location.pathname;

        if (["/logs/system", "/logs/inout", "/logs/transactions"].includes(pathname)) {
            this.setState({ logsExpanded: true });
        }

        if (["/inventory", "/inventory/add"].includes(pathname)) {
            this.setState({ inventoryExpanded: true });
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    handleLogout = () => {
        const { logoutUser } = AuthStore.getState();
        logoutUser();
    }

    toggleSidebar = () => {
        this.setState(prev => ({ collapsed: !prev.collapsed }));
    }

    toggleLogsMenu = (e) => {
        e.preventDefault();
        this.setState(prev => ({
            logsExpanded: !prev.logsExpanded,
            collapsed: prev.collapsed ? false : prev.collapsed
        }));
    }

    toggleInventoryMenu = (e) => {
        e.preventDefault();
        this.setState(prev => ({
            inventoryExpanded: !prev.inventoryExpanded,
            collapsed: prev.collapsed ? false : prev.collapsed
        }));
    }

    passProps = () => {
        const { user } = this.props;
        return React.Children.map(this.props.children, (child) => {
            if (!child) return;
            return React.cloneElement(child, { user });
        });
    }

    render() {
        const { user } = this.props;
        const { collapsed, storeState, logsExpanded, inventoryExpanded } = this.state;
        const { settings } = storeState;
        const settingsData = settings?.data;

        const staffEnabled = settingsData?.staffManagementSettings?.enabled ?? true;
        const vipEnabled = settingsData?.vipManagementSettings?.enabled ?? true;
        const branchEnabled = settingsData?.branchSettings?.enabled ?? true;

        const role = user.role.toLowerCase();
        const pathname = window.location.pathname;

        const initials = user.username
            ? user.username.slice(0, 2).toUpperCase()
            : user.role.slice(0, 2).toUpperCase();

        const isAnyLogActive = ["/logs/system", "/logs/inout", "/logs/transactions"].includes(pathname);
        const isAnyInventoryActive = ["/inventory", "/inventory/add"].includes(pathname);

        return (
            <div className="sidebar-container">
                <aside className={`sidebar-aside${collapsed ? ' collapsed' : ''}`}>

                    {/* Top Section */}
                    <div className="sb-top">
                        <div className="sb-logo-area">
                            {!collapsed && <span className="sb-logo-text">POS SYSTEM</span>}
                        </div>
                        <button className="sb-burger" onClick={this.toggleSidebar} aria-label="Toggle sidebar">
                            <Menu size={20} />
                        </button>
                    </div>

                    {/* Navigation Menu Links */}
                    <nav className="sb-nav">
                        {/* ── SECTION ONE: MAIN ── */}
                        <div className="sb-section">
                            <p className="sb-section-label">Main</p>
                            <ul className="sidebar-list">
                                {role === 'admin' ? (
                                    <>
                                        <li className={`sb-row${pathname === '/dashboard' ? ' active' : ''}`}>
                                            <Link to="/dashboard">
                                                <span className="sb-icon-wrap"><LayoutDashboard size={20} /></span>
                                                <span className="sb-title">Dashboard</span>
                                            </Link>
                                            {collapsed && <span className="sb-tooltip">Dashboard</span>}
                                        </li>

                                        {/* Inventory Accordion */}
                                        <li className={`sb-row sb-dropdown-wrapper ${inventoryExpanded ? 'is-expanded' : ''} ${isAnyInventoryActive ? 'parent-active' : ''}`}>
                                            <a href="#inventory" onClick={this.toggleInventoryMenu} className="sb-dropdown-trigger">
                                                <div className="sb-trigger-left">
                                                    <span className="sb-icon-wrap"><Package size={20} /></span>
                                                    <span className="sb-title">Inventory</span>
                                                </div>
                                                {!collapsed && (
                                                    <ChevronDown className={`sb-chevron ${inventoryExpanded ? 'rotated' : ''}`} size={16} />
                                                )}
                                            </a>
                                            {collapsed && <span className="sb-tooltip">Inventory</span>}

                                            <ul className="sb-submenu-list">
                                                <li className={`sb-sub-row${pathname === '/inventory' ? ' sub-active' : ''}`}>
                                                    <Link to="/inventory">
                                                        <span className="sb-sub-dot"></span>
                                                        <span className="sb-sub-title">View Inventory</span>
                                                    </Link>
                                                </li>
                                                <li className={`sb-sub-row${pathname === '/inventory/add' ? ' sub-active' : ''}`}>
                                                    <Link to="/inventory/add">
                                                        <span className="sb-sub-dot"></span>
                                                        <span className="sb-sub-title">Add New Item</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>

                                        {staffEnabled && (
                                            <li className={`sb-row${pathname === '/staff' ? ' active' : ''}`}>
                                                <Link to="/staff">
                                                    <span className="sb-icon-wrap"><IdCard size={20} /></span>
                                                    <span className="sb-title">Staff Management</span>
                                                </Link>
                                                {collapsed && <span className="sb-tooltip">Staff Management</span>}
                                            </li>
                                        )}
                                        {vipEnabled && (
                                            <li className={`sb-row${pathname === '/vip' ? ' active' : ''}`}>
                                                <Link to="/vip">
                                                    <span className="sb-icon-wrap"><Gem size={20} /></span>
                                                    <span className="sb-title">VIP Management</span>
                                                </Link>
                                                {collapsed && <span className="sb-tooltip">VIP Management</span>}
                                            </li>
                                        )}
                                        {branchEnabled && (
                                            <li className={`sb-row${pathname === '/branch' ? ' active' : ''}`}>
                                                <Link to="/branch">
                                                    <span className="sb-icon-wrap"><Warehouse size={20} /></span>
                                                    <span className="sb-title">Branches</span>
                                                </Link>
                                                {collapsed && <span className="sb-tooltip">Branches</span>}
                                            </li>
                                        )}
                                    </>
                                ) : role === 'clerk' ? (
                                    <>
                                        <li className={`sb-row${pathname === '/timeinout' ? ' active' : ''}`}>
                                            <Link to="/timeinout">
                                                <span className="sb-icon-wrap"><Clock size={20} /></span>
                                                <span className="sb-title">Time In / Out</span>
                                            </Link>
                                            {collapsed && <span className="sb-tooltip">Time In / Out</span>}
                                        </li>
                                        {vipEnabled && (
                                            <li className={`sb-row${pathname === '/vip' ? ' active' : ''}`}>
                                                <Link to="/vip">
                                                    <span className="sb-icon-wrap"><Gem size={20} /></span>
                                                    <span className="sb-title">VIP Management</span>
                                                </Link>
                                                {collapsed && <span className="sb-tooltip">VIP Management</span>}
                                            </li>
                                        )}

                                        {/* Clerk Inventory Accordion */}
                                        <li className={`sb-row sb-dropdown-wrapper ${inventoryExpanded ? 'is-expanded' : ''} ${isAnyInventoryActive ? 'parent-active' : ''}`}>
                                            <a href="#inventory" onClick={this.toggleInventoryMenu} className="sb-dropdown-trigger">
                                                <div className="sb-trigger-left">
                                                    <span className="sb-icon-wrap"><Package size={20} /></span>
                                                    <span className="sb-title">Inventory</span>
                                                </div>
                                                {!collapsed && (
                                                    <ChevronDown className={`sb-chevron ${inventoryExpanded ? 'rotated' : ''}`} size={16} />
                                                )}
                                            </a>
                                            {collapsed && <span className="sb-tooltip">Inventory</span>}

                                            <ul className="sb-submenu-list">
                                                <li className={`sb-sub-row${pathname === '/inventory' ? ' sub-active' : ''}`}>
                                                    <Link to="/inventory">
                                                        <span className="sb-sub-dot"></span>
                                                        <span className="sb-sub-title">View Inventory</span>
                                                    </Link>
                                                </li>
                                                <li className={`sb-sub-row${pathname === '/inventory/add' ? ' sub-active' : ''}`}>
                                                    <Link to="/inventory/add">
                                                        <span className="sb-sub-dot"></span>
                                                        <span className="sb-sub-title">Add New Item</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className={`sb-row${pathname === '/pos' ? ' active' : ''}`}>
                                            <Link to="/pos">
                                                <span className="sb-icon-wrap"><Store size={20} /></span>
                                                <span className="sb-title">POS</span>
                                            </Link>
                                            {collapsed && <span className="sb-tooltip">POS</span>}
                                        </li>
                                    </>
                                ) : null}
                            </ul>
                        </div>

                        {/* ── SECTION TWO: SYSTEM ── */}
                        {role === 'admin' && (
                            <div className="sb-section">
                                <p className="sb-section-label">System</p>
                                <ul className="sidebar-list">
                                    {/* Accordion Logs */}
                                    <li className={`sb-row sb-dropdown-wrapper ${logsExpanded ? 'is-expanded' : ''} ${isAnyLogActive ? 'parent-active' : ''}`}>
                                        <a href="#logs" onClick={this.toggleLogsMenu} className="sb-dropdown-trigger">
                                            <div className="sb-trigger-left">
                                                <span className="sb-icon-wrap"><ClipboardList size={20} /></span>
                                                <span className="sb-title">Logs</span>
                                            </div>
                                            {!collapsed && (
                                                <ChevronDown className={`sb-chevron ${logsExpanded ? 'rotated' : ''}`} size={16} />
                                            )}
                                        </a>
                                        {collapsed && <span className="sb-tooltip">Logs Menu</span>}

                                        <ul className="sb-submenu-list">
                                            <li className={`sb-sub-row${pathname === '/logs/system' ? ' sub-active' : ''}`}>
                                                <Link to="/logs/system">
                                                    <span className="sb-sub-dot"></span>
                                                    <span className="sb-sub-title">System Logs</span>
                                                </Link>
                                            </li>
                                            <li className={`sb-sub-row${pathname === '/logs/inout' ? ' sub-active' : ''}`}>
                                                <Link to="/logs/inout">
                                                    <span className="sb-sub-dot"></span>
                                                    <span className="sb-sub-title">In/Out Logs</span>
                                                </Link>
                                            </li>
                                            <li className={`sb-sub-row${pathname === '/logs/transactions' ? ' sub-active' : ''}`}>
                                                <Link to="/logs/transactions">
                                                    <span className="sb-sub-dot"></span>
                                                    <span className="sb-sub-title">Transaction Logs</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    <li className={`sb-row${pathname === '/settings' ? ' active' : ''}`}>
                                        <Link to="/settings">
                                            <span className="sb-icon-wrap"><Settings size={20} /></span>
                                            <span className="sb-title">Settings</span>
                                        </Link>
                                        {collapsed && <span className="sb-tooltip">Settings</span>}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </nav>

                    {/* Bottom User Profile Section */}
                    <div className="user-panel">
                        {role === 'clerk' && user.time && (
                            <div className="user-clock-in-container">
                                <Clock size={14} className="clock-icon" />
                                {!collapsed && (
                                    <div className="user-clock-in-texts">
                                        <p className="clock-label">Clocked in at</p>
                                        <p className="clock-value">{user.time}</p>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="user-row">
                            <div className="sb-avatar">{initials}</div>
                            {!collapsed && (
                                <div className="user-info">
                                    <p className="userName">{user.username}</p>
                                    <p className="userRole">{user.role}</p>
                                    <a
                                        className="change-password"
                                        onClick={() => AuthStore.getState().setChangePasswordModal(true)}
                                    >
                                        Change password
                                    </a>
                                </div>
                            )}
                            {!collapsed && (
                                <button className="sb-logout-btn" onClick={this.handleLogout} aria-label="Log out">
                                    <LogOut size={16} />
                                </button>
                            )}
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