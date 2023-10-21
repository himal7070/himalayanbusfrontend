import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import log from 'loglevel';
import LoginSignup from "./components/Authentication/LoginSignup.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import {ToastContainer} from "react-toastify";
import UserDashboard from "./components/User/UserDashboard.jsx";

log.setLevel(log.levels.DEBUG);


function App() {

    const userRole = localStorage.getItem('userRole');

    return (

        <Router>
            <Routes>
                <Route path="/" element={<LoginSignup onLogin={() => {}} />} />
                {userRole === 'user' && (
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                )}
                {userRole === 'admin' && (
                    <Route path="/admin-dashboard" element={<AdminDashboard  isCollapsible/>} />
                )}
            </Routes>
            <ToastContainer/>
        </Router>

    )
}

export default App
