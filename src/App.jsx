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
import TokenExpirationChecker from "./components/Authentication/TokenExpirationChecker.jsx";
log.setLevel(log.levels.DEBUG);

function App() {

    const userRoles = localStorage.getItem('userRoles');

    const [aryalNavCon, setAryalNavCon] = useState(true);




    return (
        <Router>
            <div className="App">
                {userRoles ? (
                    <>
                        <SideNavbar aryalNavCon={aryalNavCon} setAryalNavCon={setAryalNavCon} />
                        <TokenExpirationChecker>
                            <Routes>
                                {/*<Route path={"/"} element={
                                <LandingPage/>
                                }></Route>*/}
                                <Route path="/passenger-reservation" element={
                                    <ReservationDashboard aryalNavCon={aryalNavCon} />
                                } />
                                <Route path="/my-reservation" element={
                                    <MyReservation aryalNavCon={aryalNavCon} />
                                } />
                                <Route path="/profile-settings" element={
                                    <ProfileSettings   aryalNavCon={aryalNavCon} />
                                } />
                                <Route path="/profile-card" element={
                                    <ProfileCard  aryalNavCon={aryalNavCon}  />
                                } />
                                <Route path="/admin-dashboard" element={
                                    <AdminDashboard  aryalNavCon={aryalNavCon}  />
                                } />
                                <Route path="/admin-passenger" element={
                                    <AdminPassenger  aryalNavCon={aryalNavCon} />
                                } />
                                <Route path="/admin-route" element={
                                    <AdminRoute  aryalNavCon={aryalNavCon}  />
                                } />
                                <Route path="/admin-bus" element={
                                    <AdminBus  aryalNavCon={aryalNavCon}  />
                                } />
                                <Route path="/admin-reservation" element={
                                    <AdminReservation  aryalNavCon={aryalNavCon} />
                                } />
                            </Routes>
                        </TokenExpirationChecker>
                    </>
                ) : (
                    <Routes>
                        <Route path={"/"} element={
                            <LoginSignup/>
                        }></Route>
                    </Routes>
                )}
            </div>
            <ToastContainer />
        </Router>
    )
}
export default App