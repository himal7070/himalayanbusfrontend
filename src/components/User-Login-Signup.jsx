import React, {useCallback, useState} from 'react';
import '../styles/userLoginSignup.css';
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {loginUser} from "../services/User-login-Logout-API.jsx";
import {signUpUser} from "../services/Signup-API.jsx";

function LoginSignup() {

    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    const toggleShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        loginUser(email, password)
            .then((sessionKey) => {

            })
            .catch((error) => {
                console.error(error);
            });

    };

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const handleSignup = () => {
        signUpUser(user)
            .then((data) => {
                console.log('User signed up:', data);
            })
            .catch((error) => {
                console.error('Signup failed:', error);
            });
    };





    return (
        <div className="LoginSignup">
            <section>
                <div className="Main">
                    <div className="LoginImg">
                        <img src="/FlyerHimalyanBus.jpg" alt="" />
                    </div>
                    <div>
                        <div className="Wrapper">
                            <div className="TitleText">
                                <div className={`Title ${activeTab === 'login' ? 'Login' : 'Signup'}`}>{activeTab === 'login' ? 'Login Form' : 'Signup Form'}</div>
                                <div className={`Title ${activeTab === 'signup' ? 'Login' : 'Signup'}`}>{activeTab === 'signup' ? 'Login Form' : 'Signup Form'}</div>
                            </div>
                            <div className="FormContainer">
                                <div className="SlideControls">
                                    <input type="radio" name="Slide" id="Login" checked={activeTab === 'login'} onChange={() => handleTabChange('login')} />
                                    <input type="radio" name="Slide" id="Signup" checked={activeTab === 'signup'} onChange={() => handleTabChange('signup')} />
                                    <label htmlFor="Login" className={`Slide ${activeTab === 'login' ? 'Login' : 'Signup'}`}>Login</label>
                                    <label htmlFor="Signup" className={`Slide ${activeTab === 'signup' ? 'Login' : 'Signup'}`}>Signup</label>
                                    <div className="SliderTab"></div>
                                </div>
                                <div className="FormInner">
                                    {activeTab === 'login' ? (
                                        <form onSubmit={handleLogin} className="LoginForm">
                                            <div className="Field">
                                                <input
                                                    type="text"
                                                    placeholder="Email Address"
                                                    required
                                                    name = "email"
                                                />
                                            </div>
                                            <div className="Field">
                                                <div className="Field PasswordInput">
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Password"
                                                        required
                                                        className="PasswordInput InputClass"
                                                        name="password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={toggleShowPassword}
                                                        className="PasswordToggleButton"
                                                    >
                                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="TextLink">
                                                <a href="#">Forgot password?</a>
                                            </div>

                                            <div className="Field Btn">
                                                <div className="BtnLayer"></div>
                                                <input type="submit" value="Login" />
                                            </div>

                                            <div className="TextLink">
                                                Not a member? <a href="#">Signup now</a>
                                            </div>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleSignup} className="SignupForm">
                                            <div className="Field">
                                                <input
                                                    type="text"
                                                    placeholder="First Name"
                                                    required
                                                    name = "firstName"
                                                />
                                            </div>
                                            <div className="Field">
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    required
                                                    name = "lastName"
                                                />
                                            </div>
                                            <div className="Field">
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    required
                                                    name="email"
                                                />
                                            </div>
                                            <div className="Field">
                                                <input
                                                    type="text"
                                                    placeholder="Mobile Number"
                                                    required
                                                    name="phoneNumber"
                                                />
                                            </div>
                                            <div className="Field">
                                                <div className="Field PasswordInput">
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Password"
                                                        required
                                                        className="PasswordInput InputClass"
                                                        name= "password"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={toggleShowPassword}
                                                        className="PasswordToggleButton"
                                                    >
                                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="Field Btn">
                                                <div className="BtnLayer"></div>
                                                <input type="submit" value="Signup" />
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LoginSignup;
