import React, {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import log from 'loglevel';
import LoginSignup from "./components/Authentication/LoginSignup.jsx";
import {ToastContainer} from "react-toastify";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import AdminPassenger from "./components/Admin/AdminPassenger.jsx";
import SideNavbar from "./components/common/NavBar.jsx";
import AdminRoute from "./components/Admin/AdminRoute.jsx";
import ReservationDashboard from "./components/Passenger/ReservationDashboard.jsx";
import MyReservation from "./components/Passenger/MyReservation.jsx";


log.setLevel(log.levels.DEBUG);


function App() {

    const userRoles = localStorage.getItem('userRoles');

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
                {userRoles ? (
                <SideNavbar isCollapsible={isCollapsible} toggleSidebar={toggleSidebar} />
                ) : null}

                <Routes>
                    <Route path="/" element={<LoginSignup onLogin={() => {}} />} />
                    <Route path="/passenger-reservation" element={<ReservationDashboard isCollapsible={isCollapsible} toggleSidebar={toggleSidebar} />} />
                    <Route path="/my-reservation" element={<MyReservation isCollapsible={isCollapsible} toggleSidebar={toggleSidebar} />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard isCollapsible={isCollapsible} toggleSidebar={toggleSidebar} />} />
                    <Route path="/admin-passenger" element={<AdminPassenger isCollapsible={isCollapsible} toggleSidebar={toggleSidebar} />} />
                    <Route path="/admin-route" element={<AdminRoute isCollapsible={isCollapsible} toggleSidebar={toggleSidebar} />} />

                </Routes>
            </div>
            <ToastContainer />
        </Router>



    )
}

export default App
