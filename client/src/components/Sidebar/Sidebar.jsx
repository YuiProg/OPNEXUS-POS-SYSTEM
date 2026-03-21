import React from "react";
import AuthStore from "../../store/Authstore";
import Strings from "../../../../backend/strings/strings-codes";
import { Navigate, Link } from "react-router-dom";
import './Sidebar.css';

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

        //tanggalin muna error sa es-lint since dipa ginagamit tong variable nato pero eto yung items sa sidebar
        const sidebarItems = [
            "Dashboard",
            "Inventory",
            "Staff Management",
            "Logs",
            "Settings"
        ]

        return (
            <div className="sidebar-container">
                <aside>
                    <img src="https://i.imgur.com/4hfuK5S.png" alt="logo" className="logo"/>
                    <ul className="sidebar-list">
                        {sidebarItems.map((l,i) => {
                            return (
                                <div key={i}>
                                    <li className="row"><Link to={l.toLowerCase()}>{l}</Link></li>
                                </div>
                            );
                        })}
                        {/* <li><Link to="/">Home</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/users">Users</Link></li> */}
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
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Sidebar;