import React, {useCallback, useState} from 'react';
import '../styles/userLoginSignup.css';
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {loginUser} from "../services/User-login-Logout-API.jsx";
import {toast} from "react-toastify";
import {signUpUser} from "../services/Signup-API.jsx";
import 'react-toastify/dist/ReactToastify.css';
import log from 'loglevel';

// eslint-disable-next-line react/prop-types
function LoginSignup({ onLogin }) {

    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');




    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        loginUser(email, password)
            .then((sessionKey) => {
                localStorage.setItem('sessionKey', sessionKey);

                toast.success('Login successful', {
                    position: "top-right",
                });

                log.info('Login successful');

                onLogin();

            })
            .catch((error) => {
                toast.error('Login failed. Please check your credentials.', {
                    position: "top-right",
                });

                log.error('Login failed:', error);
            });
    };


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const clearForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            password: '',
        });
    };

    const handleFormChange = (e, fieldName) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    }

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);
    }, []);


    const toggleShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);




    const handleSignup = (event) => {
        event.preventDefault();

        const user = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            phoneNumber: event.target.phoneNumber.value,
            password: event.target.password.value
        };

        signUpUser(user)
            .then((data) => {
                clearForm();
                console.log('Signup successful:', data);
                toast.success('Signup successful. You can now log in.', {
                    position: "top-right",
                });
            })
            .catch((error) => {
                console.error('Signup failed:', error);
                toast.error('Signup failed. You have already an account with this email address.', {
                    position: "top-right",
                });
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
                                                    onChange={(e) => setLoginEmail(e.target.value)}
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
                                                        onChange={(e) => setLoginPassword(e.target.value)}
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
                                                    value={formData.firstName}
                                                    onChange={(e) => handleFormChange(e, 'firstName')}
                                                />
                                            </div>
                                            <div className="Field">
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    required
                                                    name = "lastName"
                                                    value={formData.lastName}
                                                    onChange={(e) => handleFormChange(e, 'lastName')}
                                                />
                                            </div>
                                            <div className="Field">
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    required
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleFormChange(e, 'email')}
                                                />
                                            </div>
                                            <div className="Field">
                                                <input
                                                    type="text"
                                                    placeholder="Mobile Number"
                                                    required
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    onChange={(e) => handleFormChange(e, 'phoneNumber')}
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
                                                        value={formData.password}
                                                        onChange={(e) => handleFormChange(e, 'password')}
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
