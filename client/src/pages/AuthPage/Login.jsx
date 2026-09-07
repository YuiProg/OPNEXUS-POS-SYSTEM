import React from "react";
import './Login.css';
import AuthStore from "../../context/Authstore.js";
import Strings from "../../strings/strings-codes.js";
import InputField from "../../components/TRInputField/InputFIeld.jsx";
import bg_logo from "../../assets/images/loginImageLogo.png";
import Toast from "../../toast/Toast.jsx";
import Button from "../../components/TRButton/Button.jsx";
import { Modal, ModalConfim } from "../../TRModal/Modal.jsx";
import ModalStore from "../../context/ModalStore.js";

const {
    UNAUTHORIZED_MESS,
    pw,
    em
} = Strings;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
            loading: false,
        };
    }

    componentDidMount() {
        this.unsubscribe = AuthStore.subscribe((state) => {
            this.setState({
                error: state.errorUser,
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
        const { email, password } = this.state;
        const loginUser = AuthStore.getState().loginUser;
        loginUser(email, password);
    };

    lockedModal = () => {
        const { setShowAccountLocked } = ModalStore.getState();
        return (
            <ModalConfim 
                error 
                onClose={() => setShowAccountLocked(false)} 
                message='Your account has been locked'
                subMessage="This is due to incorrect login multiple times or someone locked your account. Please contact administration."
            />
        );
    }

    /* global __APP_VERSION__ */
    render() {
        const { loading } = this.state;
        const { showAccountLocked } = ModalStore.getState();
        return (
            <>
                {showAccountLocked && this.lockedModal()}
                <div className="login-container">
                    <div className="login-container__hero">
                        <div className="login-container__hero-content">
                            <span className="login-container__badge">Enterprise Platform</span>
                            <h1 className="login-container__title">Streamline your business operations</h1>
                            <p className="login-container__subtitle">
                                Secure, real-time inventory management and point-of-sale reporting for modern enterprise management.
                            </p>
                        </div>
                    </div>
                    
                    <div className="login-container__credentials">
                        <div className="login-container__form-header">
                            <img loading="lazy" src={bg_logo} alt="Company Logo" className="login-container__logo" />
                            <h2>Welcome back</h2>
                            <p>Please enter your credentials to log in.</p>
                        </div>

                        <form onSubmit={(e) => this.handleLogin(e)}>
                            <InputField 
                                email 
                                required 
                                onChange={(e) => this.setState({ email: e })} 
                                placeholder={em} 
                                onEnterDown={() => {}}
                            />
                            <InputField 
                                required 
                                password 
                                onChange={(e) => this.setState({ password: e })} 
                                placeholder={pw} 
                                onEnterDown={() => {}}
                            />
                            <Button 
                                primary 
                                maxWidth
                                text={loading ? 'Logging in…' : 'Sign In'} 
                                submit 
                                disabled={loading}
                            />
                        </form>

                        <div className="login-container__footer">
                            <p>© All Rights Reserved.</p>
                            <p>v{__APP_VERSION__}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;