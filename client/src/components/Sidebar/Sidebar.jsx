import React from "react";
import AuthStore from "../../context/Authstore";
import Strings from "../../strings/strings-codes";
import { Navigate, Link } from "react-router-dom";
import './Sidebar.css';
import { LayoutDashboard, ShelvingUnit, IdCardLanyard, Logs, Warehouse, Store, Clock, Gem, Monitor, GitBranch, Settings } from 'lucide-react';
import Button from "../TRButton/Button";

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
    // componentDidMount() {
    //     const { checkAuth, AuthUser } = AuthStore.getState();
    //     checkAuth();

    //     if (AuthUser) {
    //         this.setState({ user: AuthUser });
    //     }
        
    //     this.unsubscribe = AuthStore.subscribe((state) => {
    //         const { AuthUser } = state;
    //         if (!AuthUser) {
    //             this.setState({ redirect: true, user: null });
    //         } else {
    //             this.setState({ user: AuthUser }); 
    //         }
    //     });
    // }

    // componentWillUnmount() {
    //     if (this.unsubscribe) this.unsubscribe();
    // }

    componentDidMount () {
        //console.log(this.props.user);
    }

    handleLogout = () => {
        const { logoutUser } = AuthStore.getState();
        logoutUser();
        // window.location.href = "/login";
    }

    //check kung naka login paba kada click ng tabs sa sidebar
    //pag hindi naka login i redirect natin si user sa login page
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
        // if (this.state.redirect) {
        //     return <Navigate to="/inventory" />;
        // }
        const { user } = this.props;
        //console.log(user);
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
                link: "/staff",
            },
            {
                title: "VIP Management",
                icon: <Gem />,
                link: "/vip",
            },
            {
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
            }
            // {
            //     title: "Settings",
            //     icon: <Settings />,
            //     link: "/settings",
            // },
        ]

        const sidebarItemsClerk = [
            {
                title: "Time In / Out",
                icon: <Clock />,
                link: "/timeinout",
            },
            {
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
        ];

        //for debugging
        // if (!user) {
        //     return;
        // }

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