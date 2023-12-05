import React, {useEffect, useState} from 'react';
import {viewReservationsForCurrentUser} from "../../services/ReservationService.jsx";
import '/src/styles/common/Dashboard.css'

import '/src/styles/Passenger/MyReservation.css'

// eslint-disable-next-line react/prop-types
function Reservation({ isCollapsible, toggleSidebar }) {




    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };


    useEffect(() => {
        (async () => {
            try {
                const accessToken = getAccessToken();
                const userReservations = await viewReservationsForCurrentUser(accessToken);
                console.log('User Reservations:', userReservations);
                setReservations(userReservations);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        })();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <section className={`dashboard-section ${isCollapsible ? 'collapsible' : ''}`}>
            <div className={`dashboard-content ${isCollapsible ? 'collapsible' : ''}`}>
                <i className="bi-list sidebar-toggle" onClick={toggleSidebar}></i>
                <div className="dashboard-overview">
                    <div className="dashboard-title">
                        <i className="bi-calendar-check-fill"></i>
                        <span className="dashboard-name">My Reservation</span>
                    </div>

                    <div className="reservation-dashboard">
                        <p>Hello, Its me himal aryal don</p>
                        <p>Profession: Pro React Developer lol :D brouhaha</p>
                        <div>
                            <h2>Reservations for Current User</h2>
                            {reservations.length === 0 ? (
                                <p>No reservations found for the current user</p>
                            ) : (
                                <ul>
                                    {reservations.map((reservation) => (
                                        <li key={reservation.id}>
                                            <p>Departure Location: {reservation.departureLocation}</p>
                                            <p>Destination: {reservation.destination}</p>
                                            <p>Journey Date: {reservation.journeyDate}</p>
                                            <p>Booked Seat: {reservation.bookedSeat}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Reservation;