import React, {useCallback, useState} from 'react';
import '/src/styles/Authentication/LoginSignup.css';
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import log from 'loglevel';
import {login} from "../../services/Authentication/Login-Logout-API.jsx";
import {signUpUser} from "../../services/Authentication/Signup-API.jsx";
import {useNavigate} from "react-router-dom";



// eslint-disable-next-line react/prop-types
function LoginSignup({ onLogin }) {

    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [role, setRole] = useState('user');

    const handleLogin = (event, role) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        login(email, password, role)
            .then(sessionKey => {
                localStorage.setItem('sessionKey', sessionKey);
                localStorage.setItem('userRole', role);
                toast.success(`${role} login successful`, {
                    position: "top-right",
                });
                log.info(`${role} login successful`);
                onLogin();

                if (role === 'user') {
                    window.location.href ='/user-dashboard';
                } else if (role === 'admin') {
                    window.location.href ='/admin-dashboard';
                }
            })
            .catch(error => {
                toast.error(`${role} login failed. Please check your credentials.`, {
                    position: "top-right",
                });
                log.error(`${role} login failed:`, error);
            });
    };


    const  [formData, setFormData] = useState({
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
                                        <form onSubmit={(event) => handleLogin(event, role)} className="LoginForm">
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
                                            <div className="Field">
                                                <label>Role:</label>
                                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
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
