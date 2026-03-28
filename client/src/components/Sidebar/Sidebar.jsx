import React from "react";
import AuthStore from "../../context/Authstore";
import Strings from "../../strings/strings-codes";
import { Navigate, Link } from "react-router-dom";
import './Sidebar.css';
import { LayoutDashboard, ShelvingUnit, IdCardLanyard, Logs, Warehouse, Store, Clock, Monitor, GitBranch } from 'lucide-react';
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
        window.location.href = "/login";
    }

    //check kung naka login paba kada click ng tabs sa sidebar
    //pag hindi naka login i redirect natin si user sa login page
    checkAuthentication = () => {

    }

    render() {
        // if (this.state.redirect) {
        //     return <Navigate to="/inventory" />;
        // }
        const { user } = this.props;
        console.log(user);
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
                title: "Logs",
                icon: <Logs />,
                link: "/logs",
            },
            {
                title: "Branches",
                icon: <Warehouse/>,
                link: "/branch",
            },
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
                <aside>
                    <img loading="lazy" fetchPriority="high" src="https://i.imgur.com/4hfuK5S.png" alt="logo" className="logo"/>
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
                        {this.props.user ? (
                            <>
                            <p className="userName">{user.username}</p>
                            <p className="userRole">{user.role}</p>
                            </>
                        ) : <p>LOADING ...</p>}
                        <Button error text="LOG OUT" onClick={() => this.handleLogout()}/>
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