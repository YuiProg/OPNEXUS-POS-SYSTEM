import React from "react";
import './Login.css';
import AuthStore from "../../store/Authstore";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
            loading: false
        };
    }

    componentDidMount() {
        this.unsubscribe = AuthStore.subscribe((state) => {
            this.setState({
                error: state.error,
                loading: state.AuthLoading
            });
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    handleKeyChange = (key, value) => {
        this.setState({ [key]: value });
    };

    handleLogin = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        const loginUser = AuthStore.getState().loginUser;
        loginUser(username, password);
    };

    render() {
        const { error, loading, username, password } = this.state;
        
        return (
            <div>
                <h1>Login</h1>
                <p>Username</p>
                <form onSubmit={this.handleLogin}>
                    {error && <p className="error">{error.message || error}</p>}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => this.handleKeyChange('username', e.target.value)}
                        placeholder="Enter Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => this.handleKeyChange('password', e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                    <button type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
                </form>
            </div>
        );
    }
}

export default Login;