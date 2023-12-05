import React, {useEffect, useState} from 'react';
import '/src/styles/common/Dashboard.css'
import '/src/styles/Passenger/BusList.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import {countAllPassengers} from "../../services/PassengerService.jsx";
import {countAllRoute} from "../../services/RouteService.jsx";
import {countAllAdmin} from "../../services/AdminService.jsx";
import {countAllBus} from "../../services/BusService.jsx";
import {countTodayReservations} from "../../services/ReservationService.jsx";

// eslint-disable-next-line react/prop-types
function AdminDashboard({ isCollapsible , toggleSidebar}) {


    const [TodayReservationCount, setTodayReservationCount] = useState(null);
    const [passengerCount, setPassengerCount] = useState(null);
    const [RouteCount, setRouteCount] = useState(null);
    const [AdminCount, setAdminCount] = useState(null);
    const [BusCount, setBusCount] = useState(null);


    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };


    useEffect(() => {
        const fetchPassengerCount = async () => {
            try {
                const accessToken = getAccessToken();
                const count = await countAllPassengers(accessToken);
                setPassengerCount(count);
            } catch (error) {
                console.error('Error fetching passenger count:', error);
            }
        };

        const fetchRouteCount = async () => {
            try {
                const accessToken = getAccessToken();
                const count = await countAllRoute(accessToken);
                setRouteCount(count);
            } catch (error) {
                console.error('Error fetching route count:', error);
            }
        };

        const fetchAdminCount = async () => {
            try {
                const accessToken = getAccessToken();
                const count = await countAllAdmin(accessToken);
                setAdminCount(count);
            } catch (error) {
                console.error('Error fetching route count:', error);
            }
        };


        const fetchBusCount = async () => {
            try {
                const accessToken = getAccessToken();
                const count = await countAllBus(accessToken);
                setBusCount(count);
            } catch (error) {
                console.error('Error fetching route count:', error);
            }
        };

        const fetchTodayReservationCount = async () => {
            try {
                const accessToken = getAccessToken();
                const count = await countTodayReservations(accessToken);
                setTodayReservationCount(count);
            } catch (error) {
                console.error('Error fetching reservation count:', error);
            }
        };



        const fetchData = async () => {
            try {
                await fetchTodayReservationCount();
                await fetchPassengerCount();
                await fetchRouteCount();
                await fetchAdminCount();
                await fetchBusCount();

            } catch (error) {
                console.error('Unhandled error in fetchData:', error);
            }
        };

        fetchData().catch((error) => {
            console.error('Unhandled error in fetchData:', error);
        });
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
                            <span className="dashboard-number">{AdminCount !== null ? AdminCount : '--'}</span>
                        </div>
                        <div className="dashboard-box two">
                            <i className="bi-check-circle-fill"></i>
                            <span className="dashboard-name">Reservations</span>
                            <span className="dashboard-number">{TodayReservationCount !== null ? TodayReservationCount : '--'}</span>
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
                            <span className="dashboard-number">{BusCount !== null ? BusCount : '--'}</span>
                        </div>
                        <div className="dashboard-box two">
                            <i className="bi-geo-alt-fill"></i>
                            <span className="dashboard-name">Routes</span>
                            <span className="dashboard-number">{RouteCount !== null ? RouteCount : '--'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AdminDashboard;