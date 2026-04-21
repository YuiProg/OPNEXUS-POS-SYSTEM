import React from "react";
import './Login.css';
import AuthStore from "../../context/Authstore.js";
import Strings from "../../strings/strings-codes.js";
import InputField from "../../components/TRInputField/InputFIeld.jsx";
import bg_image1 from "../../assets/images/ProductsLoginImage1.svg";
import bg_image2 from "../../assets/images/ProductsLoginImage2.svg";
import bg_image3 from "../../assets/images/ProductsLoginImage3.svg";
import bg_logo from "../../assets/images/loginImageLogo.png";
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
                    <div className="login-container__marquee" aria-hidden="true">
                        {Array.from({ length: 20 }).map((_, rowIndex) => (
                            <div key={rowIndex} className="login-container__marquee-row">
                                <div className="login-container__marquee-track">
                                    <span>RELX JUICE</span>
                                    <span>XULTRA JUICE</span>
                                    <span>PUFFS BLACK</span>
                                    <span>VAPE FLAVOR</span>
                                    <span>CLOUD CART</span>
                                    <span>RELX JUICE</span>
                                    <span>XULTRA JUICE</span>
                                    <span>PUFFS BLACK</span>
                                    <span>VAPE FLAVOR</span>
                                    <span>CLOUD CART</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="login-container__image">
                        <img src={bg_image1} className="login-container__image-one"/>
                        <img src={bg_image2} className="login-container__image-two"/>
                        <img src={bg_image3} className="login-container__image-three"/>
                    </div>
                    <div className="login-container__credentials">
                        <img src={bg_logo}>
                        </img>
                        <p className="login-container__mobile-heading"> Vaporya POS System </p>    
                        <form onSubmit={(e) => this.handleLogin(e)}>
                            <InputField 
                                email 
                                required 
                                onChange={(e) => this.setState({email: e})} 
                                placeholder={em} 
                                onEnterDown={() => {}}
                            />
                            <InputField 
                                required 
                                password 
                                onChange={(e) => this.setState({password: e})} 
                                placeholder={pw} 
                                onEnterDown={() => {}}
                            />
                            <Button 
                                error 
                                maxWidth
                                text={loading ? 'Logging in…' : 'Login'} 
                                submit 
                                disabled={loading}
                            />
                        </form>
                        <p className="login-container__credentials-footer">
                            All Rights Reserved.
                        </p>
                        <p className="login-container__credentials-footer">v1.1.0</p>
                    </div>
                </div>
            </>
        );
    }
}

export default Login;