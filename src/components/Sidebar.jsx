import React, {useEffect, useState} from 'react';
import '../styles/Sidebar.css';
function Sidebar() {

    const [isCollapsible, setIsCollapsible] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsible(!isCollapsible);
    };

    useEffect(() => {
        const body = document.body;
        if (isDarkMode) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className={`sidebar ${isCollapsible ? "collapsible" : ""}`}>
            <div className="header">
                <span className="my-logo-name">Himalayan Bus</span>
                <button className="uil-bars sidebar-toggle" onClick={toggleSidebar}></button>
            </div>

            <div className="menu">
                <ul className="menu-items">
                    <li>
                        <a href="">
                            <i className="uil-estate"></i>
                            <span className="menu-item-nav">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fi-rs-user"></i>
                            <span className="menu-item-nav">Users</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fi-rr-bus"></i>
                            <span className="menu-item-nav">Buses</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fi-rr-memo-circle-check"></i>
                            <span className="menu-item-nav">Reservations</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fi-rr-smiley-comment-alt"></i>
                            <span className="menu-item-nav">FeedBacks</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fi-rs-route"></i>
                            <span className="menu-item-nav">Routes</span>
                        </a>
                    </li>
                </ul>

                <ul className="user-actions">
                    <li>
                        <a id="logoutButton">
                            <i className="uil-signout"></i>
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
            </div>
        </div>

    );
}

export default Sidebar;
