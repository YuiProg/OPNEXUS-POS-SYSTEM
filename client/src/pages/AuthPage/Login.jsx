import React from "react";
import './Login.css';
import AuthStore from "../../store/Authstore";
import Strings from "../../../../backend/strings/strings-codes.js";

const {
    UNAUTHORIZED_MESS,
    pw,
    nm,
    us
} = Strings;

class Login extends React.Component {
    //wala namang props na naipipasa for now
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
            loading: false
        };
    }
    
    //ANO GINAGAWA NETO:
    //LAHAT NG FUNCTION SA LOOB NETONG COMPONENT DID MOUNT
    //WILL EXECUTE ONCE NA MAG RENDER SA BROWSER ETONG LOGIN PAGE
    //KUKUNIN NATIN YUNG MGA STATE GLOBAL STORE (AUTHSTORE) PARA KUNG
    //MAG UPDATE MAN YUNG DATA DON MAG EEXECUTE NG RERENDER ANG PAGE PARA 
    //I DISPLAY AT UPDATE NATIN YUNG PAGE SA COMPONENT NATO
    componentDidMount() {
        this.unsubscribe = AuthStore.subscribe((state) => {
            this.setState({
                error: state.error,
                loading: state.AuthLoading
            });
        });
    }


    //ANO GINAGAWA NETO:
    //THIS WILL UNSUBSCRIBE SA GLOBAL STORE MEANING HINDI
    //NA TAYO HIHINGI PA NG UPDATES SA GLOBAL STORE
    //WHY IS THIS IMPORTANT:
    //IMPROVES PERFORMANCE
    //DISABLES MEMORY LEAK
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    handleKeyChange = (key, value) => {
        this.setState({[key]: value });
        console.log(key);
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
                <form onSubmit={this.handleLogin}>
                    {error && error.message != UNAUTHORIZED_MESS && <p>{error.message || error}</p>}
                    {/* JAVASCRIPT STRIKES AGAIN TANGINA (USNM) DI PEDE PERO (PW) PEDE AMPUTA FUCK YOU */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => this.handleKeyChange(us.toLocaleLowerCase() + nm, e.target.value)}
                        placeholder="Enter Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => this.handleKeyChange(pw, e.target.value)}
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