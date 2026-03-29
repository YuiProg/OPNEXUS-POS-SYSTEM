import React from "react";
import './Login.css';
import AuthStore from "../../context/Authstore.js";
import Strings from "../../strings/strings-codes.js";
import InputField from "../../components/TRInputField/InputFIeld.jsx";
import bg_image from "../../assets/images/ProductsLoginImage.png"
import bg_logo from "../../assets/images/loginImageLogo.png"
import Toast from "../../toast/Toast.jsx";
import Button from "../../components/TRButton/Button.jsx";

const {
    UNAUTHORIZED_MESS,
    pw,
    em
} = Strings;

class Login extends React.Component {
    //wala namang props na naipipasa for now
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
            loading: false,
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
                error: state.errorUser,
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
    // ulol
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    handleKeyChange = (key, value) => {
        this.setState({[key]: value });
        console.log(key);
    };

    handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const loginUser = AuthStore.getState().loginUser;
        loginUser(email, password);
    };

    render() {
        const { loading } = this.state;
        return (
            <>
                {/* {error && (
                    <Toast
                        error
                        message={error.status || 'Failed to login'}
                        hasButton={false}
                        CB={() => {}}
                        onClose={() => AuthStore.setState({ error: null })}
                    />
                )} */}
                <div className="login-container">
                    <div className="login-container__image">
                        <img src={bg_logo} className="login-container__image-one"/> 
                        <img src={bg_image} className="login-container__image-two"/>
                    </div>
                    <div className="login-container__credentials">
                        <img src={bg_logo}>
                        </img>    
                        <form onSubmit={(e) => this.handleLogin(e)}>
                            <InputField email required onChange={(e) => this.setState({email: e})} placeholder={em} onEnterDown={() => {}}/>
                            <InputField required password onChange={(e) => this.setState({password: e})} placeholder={pw} onEnterDown={() => {}}/>
                            <Button error text={loading ? 'Logging in…' : 'Login'} submit disabled={loading}/>
                        </form>
                        <p className="login-container__credentials-footer">
                            All Rights Reserved.
                        </p>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;