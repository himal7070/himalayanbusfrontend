import React, {useState} from 'react'
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
import AdminBus from "./components/Admin/AdminBus.jsx";
import AdminReservation from "./components/Admin/AdminReservation.jsx";
import ProfileSettings from "./components/Passenger/ProfileSettings.jsx";
import ProfileCard from "./components/Passenger/ProfileCard.jsx";


log.setLevel(log.levels.DEBUG);


function App() {

    const userRoles = localStorage.getItem('userRoles');


    const [showNav, setShowNav] = useState(true);
    return (

        <Router>
            <div className="App">
                {userRoles ? (
                    <SideNavbar showNav={showNav} setShowNav={setShowNav} />

                ) : null}
                <Routes>

                    {/*<Route path={"/"} element={<LandingPage/>}></Route>*/}
                    <Route path={"/"} element={<LoginSignup/>}></Route>
                    <Route path="/passenger-reservation" element={<ReservationDashboard showNav={showNav} setShowNav={setShowNav} />} />
                    <Route path="/my-reservation" element={<MyReservation showNav={showNav} setShowNav={setShowNav}/>} />

                    <Route path="/profile-settings" element={<ProfileSettings  showNav={showNav} setShowNav={setShowNav} />} />
                    <Route path="/profile-card" element={<ProfileCard  showNav={showNav} setShowNav={setShowNav} />} />

                    <Route path="/admin-dashboard" element={<AdminDashboard showNav={showNav} setShowNav={setShowNav} />} />
                    <Route path="/admin-passenger" element={<AdminPassenger showNav={showNav} setShowNav={setShowNav} />} />
                    <Route path="/admin-route" element={<AdminRoute showNav={showNav} setShowNav={setShowNav} />} />
                    <Route path="/admin-bus" element={<AdminBus showNav={showNav} setShowNav={setShowNav} />} />
                    <Route path="/admin-reservation" element={<AdminReservation showNav={showNav} setShowNav={setShowNav} />} />

                </Routes>
            </div>
            <ToastContainer />
        </Router>



    )
}

export default App
