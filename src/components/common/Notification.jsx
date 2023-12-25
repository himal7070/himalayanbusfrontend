import React, {useEffect, useState} from 'react';
import {Badge, IconButton, Menu, MenuItem} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PropTypes from 'prop-types';
import {connectWebSocket, disconnectWebSocket} from '../../services/WebSocketMessageService.jsx';

const Notification = ({ message }) => {
    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
};

const NotificationMenu = () => {
    const [notifications, setNotifications] = useState([]);
    const [, setWebSocketOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationClick = (notificationIndex) => {
        setNotifications((prevNotifications) => {
            return prevNotifications.filter((_, index) => index !== notificationIndex);
        });
    };

    useEffect(() => {
        const initializeWebSocket = async () => {
            try {
                connectWebSocket((notification) => {
                    setNotifications((prevNotifications) => [...prevNotifications, { message: notification }]);
                });


                setWebSocketOpen(true);
            } catch (error) {
                console.error('WebSocket initialization error:', error);
            }
        };

        initializeWebSocket();

        return () => {
            disconnectWebSocket();
            setWebSocketOpen(false);
        };
    }, []);

    return (
        <div>
            <IconButton onClick={handleClick} style={{ width: '40px', height: '40px' }}>
                <Badge badgeContent={notifications.length} color="secondary" overlap="circular">
                    <NotificationsIcon style={{ fontSize: '28px', borderRadius: '50%' }} />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                id="notification-menu"
            >
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <MenuItem key={index} onClick={() => handleNotificationClick(index)}>
                            <Notification message={notification.message} />
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>No notifications</MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default NotificationMenu;
