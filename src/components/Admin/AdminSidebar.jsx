import '/src/styles/Admin/AdminSidebar.css';
import useDarkMode from "../common/Dark-mode.jsx";
import {Link} from "react-router-dom";
import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logout from "../common/Logout-handle.jsx";



// eslint-disable-next-line react/prop-types
function AdminSidebar({ isCollapsible }) {


    const {toggleDarkMode } = useDarkMode();

    return (


        <nav className={`sidebar ${isCollapsible ? "collapsible" : ""}`}>

            <div className="header">
                <span className="my-logo-name">Himalayan Bus</span>

            </div>


            <nav className="menu">
                <ul className="menu-items">
                    <li>
                        <Link to="/admin-dashboard">
                            <i className="bi-house-door-fill"></i>
                            <span className="menu-item-nav">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin-user">
                            <i className="bi-person-fill"></i>
                            <span className="menu-item-nav">Users</span>
                        </Link>
                    </li>
                    <li>
                        <a href="">
                            <i className="bi-bus-front-fill"></i>
                            <span className="menu-item-nav">Buses</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="bi-calendar-check-fill"></i>
                            <span className="menu-item-nav">Reservations</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="bi-chat-dots-fill"></i>
                            <span className="menu-item-nav">FeedBacks</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="bi-geo-alt-fill"></i>
                            <span className="menu-item-nav">Routes</span>
                        </a>
                    </li>
                </ul>

                <ul className="user-logout-darkmode-actions">
                    <li>
                        <a id="logoutButton" onClick={Logout} >
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
        </nav>


    );
}

export default AdminSidebar;
