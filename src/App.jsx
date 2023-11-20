import React, {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import log from 'loglevel';
import LoginSignup from "./components/Authentication/LoginSignup.jsx";
import {ToastContainer} from "react-toastify";
import UserDashboard from "./components/User/UserDashboard.jsx";
import AdminSidebar from "./components/Admin/AdminSidebar.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import AdminUsers from "./components/Admin/AdminUsers.jsx";

log.setLevel(log.levels.DEBUG);


function App() {

    const userRole = localStorage.getItem('userRole');

    const [isCollapsible, setIsCollapsible] = useState(false);


    const toggleSidebar = () => {
        setIsCollapsible(!isCollapsible);
    };

    const checkScreenWidth = () => {
        const breakpoint = 768;

        if (window.innerWidth <= breakpoint) {
            setIsCollapsible(true);
        } else {
            setIsCollapsible(false);
        }

    };

    useEffect(() => {
        window.addEventListener('resize', checkScreenWidth);
        return () => {
            window.removeEventListener('resize', checkScreenWidth);
        };
    }, []);

    useEffect(() => {
        checkScreenWidth();
    }, []);


    return (

        <Router>
            <div className="App">
                {userRole === 'ADMIN' && (
                    <>
                    <AdminSidebar
                        isCollapsible={isCollapsible}
                    />

                    </>

                )}
                <Routes>
                    <Route path="/" element={<LoginSignup onLogin={() => {}} />} />
                    {userRole === 'USER' && (
                        <Route path="/user-dashboard" element={<UserDashboard />} />
                    )}
                    {userRole === 'ADMIN' && (
                        <>
                            <Route path="/admin-dashboard" element={<AdminDashboard isCollapsible={isCollapsible} toggleSidebar={toggleSidebar}/>} />
                            <Route path="/admin-user" element={<AdminUsers isCollapsible={isCollapsible} toggleSidebar={toggleSidebar} />} />
                        </>
                    )}
                </Routes>
            </div>
            <ToastContainer />
        </Router>

    )
}

export default App
