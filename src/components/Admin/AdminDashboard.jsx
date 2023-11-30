import React, {useEffect, useState} from 'react';
import '/src/styles/common/Dashboard.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {countAllPassengers} from "../../services/Passenger/PassengerService.jsx";

// eslint-disable-next-line react/prop-types
function AdminDashboard({ isCollapsible , toggleSidebar}) {


    const [passengerCount, setPassengerCount] = useState(null);
    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };


    const fetchPassengerCount = async () => {
        try {
            const accessToken = getAccessToken();
            const count = await countAllPassengers(accessToken);
            setPassengerCount(count);
        } catch (error) {
            console.error('Error fetching passenger count:', error);
        }
    };

    useEffect(() => {
        fetchPassengerCount();
    }, []);




    return (
        <section className={`dashboard-section ${isCollapsible ? 'collapsible' : ''}`}>
            <div className={`dashboard-content ${isCollapsible ? 'collapsible' : ''}`}>
                <i className="bi-list sidebar-toggle" onClick={toggleSidebar}></i>
                <div className="dashboard-overview">
                    <div className="dashboard-title">
                        <i className="bi-speedometer2"></i>
                        <span className="dashboard-name">Dashboard Overview</span>
                    </div>
                    <div className="dashboard-boxes">
                        <div className="dashboard-box three">
                            <i className="bi-person-fill"></i>
                            <span className="dashboard-name">Admins</span>
                            <span className="dashboard-number">--</span>
                        </div>
                        <div className="dashboard-box two">
                            <i className="bi-check-circle-fill"></i>
                            <span className="dashboard-name">Reservations</span>
                            <span className="dashboard-number">--</span>
                        </div>
                        <div className="dashboard-box three">
                            <i className="bi-envelope-check"></i>
                            <span className="dashboard-name">Feedbacks</span>
                            <span className="dashboard-number">--</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '30px' }} className="dashboard-boxes">
                        <div className="dashboard-box one">
                            <i className="bi-person-circle"></i>
                            <span className="dashboard-name">Passengers</span>
                            <span className="dashboard-number">{passengerCount !== null ? passengerCount : '--'}</span>
                        </div>
                        <div className="dashboard-box one">
                            <i className="bi-bus-front-fill"></i>
                            <span className="dashboard-name">Buses</span>
                            <span className="dashboard-number">--</span>
                        </div>
                        <div className="dashboard-box two">
                            <i className="bi-geo-alt-fill"></i>
                            <span className="dashboard-name">Routes</span>
                            <span className="dashboard-number">--</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AdminDashboard;