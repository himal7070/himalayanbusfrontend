import React from 'react';
import useAuthentication from "../common/Logout-handle.jsx";


function UserDashboard() {

    const { userRole, sessionKey, handleLogout } = useAuthentication();


    return (
        <div className="Dashboard">
            <h1>Welcome to User Dashboard</h1>
            <p>Hello, Its me himal aryal don</p>
            <p>Profession: Pro React Developer lol :D brouhaha</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default UserDashboard;
