import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import log from 'loglevel';
import {logout} from "../../services/Authentication/Login-Logout-API.jsx";

const useAuthentication = () => {
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
    const [sessionKey, setSessionKey] = useState(localStorage.getItem('sessionKey'));

    useEffect(() => {
        setUserRole(localStorage.getItem('userRole'));
        setSessionKey(localStorage.getItem('sessionKey'));
    }, []);

    const handleLogout = async () => {
        try {
            console.log('Retrieved userRole:', userRole);

            if (sessionKey && userRole) {
                console.log('Found session key:', sessionKey);

                console.log('Role before calling logout:', userRole);
                let result;
                if (userRole === 'user' || userRole === 'admin') {
                    result = await logout(sessionKey, userRole);
                } else {
                    console.error('Invalid user role:', userRole);
                    return;
                }

                if (result === `${userRole} logged out successfully.`) {
                    localStorage.removeItem('sessionKey');

                    toast.success('Logout successful', {
                        position: 'top-right',
                    });

                    log.info('Logout successful');

                    window.location.href = '/';
                } else {
                    toast.error('Logout failed. Please try again.', {
                        position: 'top-right',
                    });

                    log.error('Logout failed');
                }
            } else {
                console.error('Session key or user role is undefined or not found.');
            }
        } catch (error) {
            toast.error('Logout failed. Please try again.', {
                position: 'top-right',
            });

            log.error('Logout failed:', error);
        }
    };

    return { userRole, sessionKey, handleLogout };
};

export default useAuthentication;
