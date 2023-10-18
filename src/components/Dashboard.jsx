import React from 'react';
import log from 'loglevel';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {logoutUser} from "../services/User-login-Logout-API.jsx";


function Dashboard() {


    const handleLogout = async () => {
        try {
            const sessionKey = localStorage.getItem('sessionKey');
            if (sessionKey) {
                console.log('Found session key:', sessionKey);

                const result = await logoutUser(sessionKey);

                if (result === 'User logged out successfully.') {
                    localStorage.removeItem('sessionKey');

                    toast.success('Logout successful', {
                        position: 'top-right',
                    });

                    log.info('Logout successful');

                    window.location.href = '/login';
                } else {
                    toast.error('Logout failed. Please try again.', {
                        position: 'top-right',
                    });

                    log.error('Logout failed');
                }
            } else {
                console.error('Session key is undefined or not found.');
            }
        } catch (error) {
            toast.error('Logout failed. Please try again.', {
                position: 'top-right',
            });

            log.error('Logout failed:', error);
        }
    }



    return (

        <div className="Dashboard">
            <h1>Welcome to My Dashboard</h1>
            <p>Hello, Its me himal aryal don</p>
            <p>Profession: Pro React Developer lol :D brouhaha</p>
            <button onClick={handleLogout}>Logout</button>
        </div>

    );
}

export default Dashboard;
