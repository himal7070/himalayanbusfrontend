import '/src/styles/Admin/AdminSidebar.css';
import useDarkMode from "../common/Dark-mode.jsx";
import useAuthentication from "../common/Logout-handle.jsx";


// eslint-disable-next-line react/prop-types
function AdminSidebar({ isCollapsible, toggleSidebar }) {


    const {handleLogout } = useAuthentication();
    const {toggleDarkMode } = useDarkMode();

    return (
        <div className={`sidebar ${isCollapsible ? "collapsible" : ""}`}>

            <div className="header">
                <span className="my-logo-name">Himalayan Bus</span>
                <i className="uil-bars sidebar-toggle" onClick={toggleSidebar}></i>
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
                        <a id="logoutButton" onClick={handleLogout} >
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

export default AdminSidebar;
