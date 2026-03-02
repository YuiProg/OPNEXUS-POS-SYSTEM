import React from "react";
import './Login.css';
import AuthStore from "../../store/Authstore";

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: null,
            password: null
        }
    }

    handleKeyChange = (key, value) => {
        this.setState({[key]: value});
    }

    handleLogin = (e) => {
        e.preventDefault();
        const {loginUser} = AuthStore.getState();
        const {username, password} = this.state;

        loginUser(username, password);
    }

    render () {
        return (
            <div>
                <h1>Login</h1>
                <p>Username</p>
                <form onSubmit={(e) => this.handleLogin(e)}>
                    <input type="text" onChange={(e) => this.handleKeyChange('username', e.target.value)} placeholder="Enter Username" required/>
                    <input type="password" onChange={(e) => this.handleKeyChange('password', e.target.value)} placeholder="Enter Password" required/>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;