import React from "react";
import AuthStore from "../../store/Authstore";
import Strings from "../../strings/strings-codes";
import { Navigate, Link } from "react-router-dom";
import './Sidebar.css';
import { LayoutDashboard, ShelvingUnit, IdCardLanyard, Logs, Settings, Store } from 'lucide-react';

const { SUCCESS_MESS } = Strings;

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            user: null
        };
    }
    //pang protect ng routes
    //pag walang user na naka login
    //mag reredirect siya sa login page
    componentDidMount() {
        const { checkAuth } = AuthStore.getState();
        checkAuth();

        const { AuthUser } = AuthStore.getState();
        if (AuthUser) {
            this.setState({ user: AuthUser });
        }

        this.unsubscribe = AuthStore.subscribe((state) => {
            const { AuthUser } = state;
            if (!AuthUser) {
                this.setState({ redirect: true, user: null });
            } else {
                this.setState({ user: AuthUser }); 
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    handleLogout = () => {
        const { logoutUser } = AuthStore.getState();
        logoutUser();
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/login" />;
        }
        const { user } = this.props;
        //tanggalin muna error sa es-lint since dipa ginagamit tong variable nato pero eto yung items sa sidebar
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
            {
                title: "Staff Management",
                icon: <IdCardLanyard />,
                link: "/staff-management",
            },
            {
                title: "Logs",
                icon: <Logs />,
                link: "/logs",
            },
            {
                title: "Settings",
                icon: <Settings />,
                link: "/settings",
            }
        ]

        const sidebarItemsClerk = [
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
            {
                title: "POS",
                icon: <Store/>,
                link: "/pos"
            }
        ];

        if (!user) {
            return;
        }

        return (
            <div className="sidebar-container">
                <aside>
                    <img src="https://i.imgur.com/4hfuK5S.png" alt="logo" className="logo"/>
                    <ul className="sidebar-list">
                        {user.role === 'admin' ? (
                            sidebarItemsAdmin.map((l,i) => {
                                return (
                                    <li key={i} className="row" id={window.location.pathname == l.link ? "active" : ""}>
                                        <Link to={l.link}>
                                            <div className="sb-icon">{l.icon}</div>
                                            <div className="sb-title">{l.title}</div>
                                        </Link>
                                    </li>
                                );
                            })
                        ) : user.role === 'clerk' ? (
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
                        {this.state.user ? (
                            <>
                            <p className="userName">{this.state.user.username}</p>
                            <p className="userRole">{this.state.user.role}</p>
                            </>
                        ) : <p>LOADING ...</p>}
                        <button className="logout-button" onClick={() => this.handleLogout()}>LOG OUT</button>
                    </div>
                </aside>
                <main className="children">
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Sidebar;