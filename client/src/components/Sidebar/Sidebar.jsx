import React from "react";
import AuthStore from "../../context/Authstore";
import { Link } from "react-router-dom";
import './Sidebar.css';
import {
    LayoutDashboard, Package, IdCard, Gem, Warehouse,
    ClipboardList, Settings, Clock, Store, LogOut, Menu, ChevronDown, Truck
} from 'lucide-react';
import SettingsStore from "../../context/SettingsStore";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            logsExpanded: false,
            inventoryExpanded: false,
            staffExpanded: false,
            supplierExpanded: false,
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
        if (["/staff", "/staff/add"].includes(pathname)) {
            this.setState({ staffExpanded: true });
        }
        if (["/supplier", "/supplier/add"].includes(pathname)) {
            this.setState({ supplierExpanded: true });
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

    toggleMenu = (key) => (e) => {
        e.preventDefault();
        this.setState(prev => ({
            [key]: !prev[key],
            collapsed: prev.collapsed ? false : prev.collapsed,
        }));
    }

    passProps = () => {
        const { user } = this.props;
        return React.Children.map(this.props.children, (child) => {
            if (!child) return;
            return React.cloneElement(child, { user });
        });
    }

    renderAccordion({ key, expanded, active, icon, label, tooltip, items }) {
        const { collapsed } = this.state;
        return (
            <li className={`sb-row sb-dropdown-wrapper ${expanded ? 'is-expanded' : ''} ${active ? 'parent-active' : ''}`}>
                <a href={`#${key}`} onClick={this.toggleMenu(`${key}Expanded`)} className="sb-dropdown-trigger">
                    <div className="sb-trigger-left">
                        <span className="sb-icon-wrap">{icon}</span>
                        <span className="sb-title">{label}</span>
                    </div>
                    {!collapsed && (
                        <ChevronDown className={`sb-chevron ${expanded ? 'rotated' : ''}`} size={16} />
                    )}
                </a>
                {collapsed && <span className="sb-tooltip">{tooltip || label}</span>}
                <ul className="sb-submenu-list">
                    {items.map(({ path, title }) => {
                        const pathname = window.location.pathname;
                        return (
                            <li key={path} className={`sb-sub-row${pathname === path ? ' sub-active' : ''}`}>
                                <Link to={path}>
                                    <span className="sb-sub-dot"></span>
                                    <span className="sb-sub-title">{title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </li>
        );
    }

    renderSimpleItem({ path, icon, label, pathname }) {
        const { collapsed } = this.state;
        return (
            <li className={`sb-row${pathname === path ? ' active' : ''}`}>
                <Link to={path}>
                    <span className="sb-icon-wrap">{icon}</span>
                    <span className="sb-title">{label}</span>
                </Link>
                {collapsed && <span className="sb-tooltip">{label}</span>}
            </li>
        );
    }

    render() {
        const { user } = this.props;
        const { collapsed, storeState, logsExpanded, inventoryExpanded, staffExpanded, supplierExpanded } = this.state;
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
        const isAnyStaffActive = ["/staff", "/staff/add"].includes(pathname);
        const isAnySupplierActive = ["/supplier", "/supplier/add"].includes(pathname);

        return (
            <div className="sidebar-container">
                <aside className={`sidebar-aside${collapsed ? ' collapsed' : ''}`}>

                    {/* Top Section */}
                    <div className="sb-top">
                        <div className="sb-logo-area">
                            {!collapsed && <span className="sb-logo-text">{this.props.settings.data.generalSettings.systemName}</span>}
                        </div>
                        <button className="sb-burger" onClick={this.toggleSidebar} aria-label="Toggle sidebar">
                            <Menu size={20} />
                        </button>
                    </div>

                    <nav className="sb-nav">

                        {role === 'admin' ? (
                            <>
                                {/* ── OVERVIEW ── */}
                                <div className="sb-section">
                                    <p className="sb-section-label">Overview</p>
                                    <ul className="sidebar-list">
                                        {this.renderSimpleItem({ path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', pathname })}
                                    </ul>
                                </div>

                                {/* ── ITEM MANAGEMENT ── */}
                                <div className="sb-section">
                                    <p className="sb-section-label">Item Management</p>
                                    <ul className="sidebar-list">
                                        {this.renderAccordion({
                                            key: 'inventory',
                                            expanded: inventoryExpanded,
                                            active: isAnyInventoryActive,
                                            icon: <Package size={20} />,
                                            label: 'Inventory',
                                            items: [
                                                { path: '/inventory', title: 'View Inventory' },
                                                { path: '/inventory/add', title: 'Add New Item' },
                                            ],
                                        })}
                                        {this.renderAccordion({
                                            key: 'supplier',
                                            expanded: supplierExpanded,
                                            active: isAnySupplierActive,
                                            icon: <Truck size={20} />,
                                            label: 'Suppliers',
                                            items: [
                                                { path: '/supplier', title: 'View Suppliers' },
                                                { path: '/supplier/add', title: 'Add Supplier' },
                                            ],
                                        })}
                                        {branchEnabled && this.renderSimpleItem({ path: '/branch', icon: <Warehouse size={20} />, label: 'Branches', pathname })}
                                    </ul>
                                </div>

                                {/* ── PEOPLE MANAGEMENT ── */}
                                <div className="sb-section">
                                    <p className="sb-section-label">People</p>
                                    <ul className="sidebar-list">
                                        {staffEnabled && this.renderAccordion({
                                            key: 'staff',
                                            expanded: staffExpanded,
                                            active: isAnyStaffActive,
                                            icon: <IdCard size={20} />,
                                            label: 'Staff Management',
                                            items: [
                                                { path: '/staff', title: 'View Staff' },
                                                { path: '/staff/add', title: 'Add Staff' },
                                            ],
                                        })}
                                        {vipEnabled && this.renderSimpleItem({ path: '/vip', icon: <Gem size={20} />, label: 'VIP Management', pathname })}
                                    </ul>
                                </div>

                                {/* ── SYSTEM ── */}
                                <div className="sb-section">
                                    <p className="sb-section-label">System</p>
                                    <ul className="sidebar-list">
                                        {this.renderAccordion({
                                            key: 'logs',
                                            expanded: logsExpanded,
                                            active: isAnyLogActive,
                                            icon: <ClipboardList size={20} />,
                                            label: 'Logs',
                                            tooltip: 'Logs Menu',
                                            items: [
                                                { path: '/logs/system', title: 'System Logs' },
                                                { path: '/logs/inout', title: 'In/Out Logs' },
                                                { path: '/logs/transactions', title: 'Transaction Logs' },
                                            ],
                                        })}
                                        {this.renderSimpleItem({ path: '/settings', icon: <Settings size={20} />, label: 'Settings', pathname })}
                                    </ul>
                                </div>
                            </>
                        ) : role === 'clerk' ? (
                            <>
                                {/* ── OVERVIEW ── */}
                                <div className="sb-section">
                                    <p className="sb-section-label">Overview</p>
                                    <ul className="sidebar-list">
                                        {this.renderSimpleItem({ path: '/timeinout', icon: <Clock size={20} />, label: 'Time In / Out', pathname })}
                                    </ul>
                                </div>

                                {/* ── ITEM MANAGEMENT ── */}
                                <div className="sb-section">
                                    <p className="sb-section-label">Item Management</p>
                                    <ul className="sidebar-list">
                                        {this.renderAccordion({
                                            key: 'inventory',
                                            expanded: inventoryExpanded,
                                            active: isAnyInventoryActive,
                                            icon: <Package size={20} />,
                                            label: 'Inventory',
                                            items: [
                                                { path: '/inventory', title: 'View Inventory' },
                                                { path: '/inventory/add', title: 'Add New Item' },
                                            ],
                                        })}
                                        {this.renderSimpleItem({ path: '/pos', icon: <Store size={20} />, label: 'POS', pathname })}
                                    </ul>
                                </div>

                                {/* ── PEOPLE ── */}
                                {vipEnabled && (
                                    <div className="sb-section">
                                        <p className="sb-section-label">People</p>
                                        <ul className="sidebar-list">
                                            {this.renderSimpleItem({ path: '/vip', icon: <Gem size={20} />, label: 'VIP Management', pathname })}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : null}
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