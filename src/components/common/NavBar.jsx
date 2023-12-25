import '/src/styles/common/SideNavBar.css';
import useDarkMode from "../common/Dark-mode.jsx";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import Logout from "../Authentication/Logout-handle.jsx";
import {decodeJwtToken} from "../Authentication/TokenDecoder.jsx";
import {getUserInformationByEmail} from "../../services/UserService.jsx";
import NotificationMenu from "./Notification.jsx";

// eslint-disable-next-line react/prop-types
function SideNavbar({ aryalNavCon , setAryalNavCon }) {


    const userRoles = localStorage.getItem('userRoles');
    const {toggleDarkMode } = useDarkMode();

    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };

    const [imageUrl, setImageUrl] = useState("");


    useEffect(() => {
        const fetchImage = async () => {
            try {
                const authToken = getAccessToken();
                if (authToken) {
                    const decodedToken = decodeJwtToken(authToken);
                    const userEmail = decodedToken.sub;
                    const userData = await getUserInformationByEmail(userEmail, authToken);
                    const imageUrl = userData.imageProfileUrl;
                    setImageUrl(imageUrl);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        fetchImage().catch((error) => {
            console.error('Unhandled error in fetchImage:', error);
        });
    }, []);





    return (

        <div className={`body-area ${aryalNavCon ? ' body-padding' : ''}`}>
            <header className={`navHeader ${aryalNavCon ? ' body-padding' : ''}`}>
                <div className="toggleBarHeader">
                    <i
                        className={`bi ${aryalNavCon ? 'bi-x' : 'bi-list'}`}
                        onClick={() => setAryalNavCon(!aryalNavCon)}/>
                </div>
                <span className="my-logo-name">Himalayan Bus</span>
                <div className="headerRight">
                    <NotificationMenu/>
                    <Link to="/profile-card">

                        <div className="headerProfile_img">

                            {imageUrl ? (
                                <>
                                    <img src={imageUrl} alt="User"/>

                                </>
                            ) : (
                                <span>Loading image...</span>
                            )}
                        </div>
                    </Link>
                </div>
            </header>
            <div className={`sideNavBar ${aryalNavCon ? 'show' : ''}`}>
                <nav className="nav">
                    <ul className={`menu-items${aryalNavCon ? '' : 'collapsed'}`}>
                        {userRoles === 'ADMIN' && (
                            <>
                                <li>
                                    <Link to="/admin-dashboard">
                                        <i className="bi-house-door-fill"></i>
                                        <span className="menu-item-nav">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin-passenger">
                                        <i className="bi-person-fill"></i>
                                        <span className="menu-item-nav">Passengers</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin-route">
                                        <i className="bi-geo-alt-fill"></i>
                                        <span className="menu-item-nav">Routes</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin-bus">
                                        <i className="bi-bus-front-fill"></i>
                                        <span className="menu-item-nav">Buses</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin-reservation">
                                        <i className="bi-calendar-check-fill"></i>
                                        <span className="menu-item-nav">Reservations</span>
                                    </Link>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="bi-chat-dots-fill"></i>
                                        <span className="menu-item-nav">FeedBacks</span>
                                    </a>
                                </li>
                            </>
                        )}
                        {userRoles === 'USER' && (
                            <>
                                <li>
                                    <Link to="/passenger-reservation">
                                        <i className="bi-house-door-fill"></i>
                                        <span className="menu-item-nav">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/my-reservation">
                                        <i className="bi-calendar-check-fill"></i>
                                        <span className="menu-item-nav">My Reservation</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <ul className="user-logout-darkmode-actions">
                        <li>
                            <a id="logoutButton" onClick={Logout}>
                                <i className="bi-arrow-left-circle-fill"></i>
                                <span className="menu-item-nav">Logout</span>
                            </a>
                        </li>
                        <li className="dark-mode">
                            <a id="onClickDark" onClick={toggleDarkMode}>
                                <i className="uil-moon"></i>
                                <span className="menu-item-nav">Dark Mode</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
export default SideNavbar;