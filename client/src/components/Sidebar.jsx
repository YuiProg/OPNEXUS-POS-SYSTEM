import React from "react";
import AuthStore from "../store/Authstore";
import Strings from "../../../backend/strings/strings-codes";
import { Navigate, Link } from "react-router-dom";

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

        this.unsubscribe = AuthStore.subscribe((state) => {
            const { AuthUser } = state;
            if (AuthUser?.success !== SUCCESS_MESS) {
                this.setState({ redirect: true });
            }

            if (AuthUser?.data) {
                this.setState({user: AuthUser.data});
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

        return (
            <div>
                <aside>
                    <h3>Sidebar</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/users">Users</Link></li>
                    </ul>
                    <div>
                        <p>{this.state.user?.username || 'LOADING...'}</p>
                        <button onClick={() => this.handleLogout()}>LOGOUT</button>
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