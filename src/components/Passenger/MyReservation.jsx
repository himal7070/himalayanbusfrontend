import React, {useEffect, useState} from 'react';
import {deleteReservation, viewReservationsForCurrentUser} from "../../services/ReservationService.jsx";
import '/src/styles/common/Dashboard.css'

import '/src/styles/Passenger/MyReservation.css'
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import {toast} from "react-toastify";

// eslint-disable-next-line react/prop-types
function MyReservation({ showNav }) {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };


    const handleCancelReservation = async (reservationId) => {
        try {
            const authToken = getAccessToken();
            await deleteReservation(reservationId, authToken);

            const updatedReservations = reservations.map((reservation) => {
                if (reservation.reservationID === reservationId) {
                    return {
                        ...reservation,
                        status: 'Cancelled',
                    };
                }
                return reservation;
            });

            setReservations(updatedReservations);

            toast.success('Reservation has been cancelled successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } catch (error) {
            console.error('Error cancelling reservation:', error);
        }
    };



    useEffect(() => {
        (async () => {
            try {
                const accessToken = getAccessToken();
                const userReservations = await viewReservationsForCurrentUser(accessToken);
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



    const activeReservations = reservations.filter(reservation => reservation.status === 'Active');
    const cancelledReservations = reservations.filter(reservation => reservation.status === 'Cancelled');
    const expiredReservations = reservations.filter(reservation => reservation.status === 'Expired');

    return (

        <section className={`dashboard-section ${showNav ? 'pt-4 pb-4' : ''}`}>
            <div className={`dashboard-content ${showNav ? 'pt-4 pb-4' : ''}`}>
                {/*<div className="dashboard-overview">*/}
                {/*    <div className="dashboard-title">*/}
                {/*        <i className="bi-calendar-check-fill"></i>*/}
                {/*        <span className="dashboard-name">My Reservation</span>*/}
                {/*    </div>*/}

                    <div className="reservation-dashboard">
                        {activeReservations.length > 0 && (
                            <div>
                                <h2>Active Reservations</h2>
                                <ul>
                                    {activeReservations.map((reservation) => (
                                        <li key={reservation.reservationID}>
                                            <Box
                                                sx={{
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px',
                                                    padding: '16px',
                                                }}
                                            >
                                                <Typography variant="h5">Departure
                                                    Location: {reservation.departureLocation}</Typography>
                                                <Typography
                                                    variant="body1">Destination: {reservation.destination}</Typography>
                                                <Typography variant="body1">Journey
                                                    Date: {reservation.journeyDate}</Typography>
                                                <Typography variant="body1">Booked
                                                    Seat: {reservation.bookedSeat}</Typography>
                                                <Typography variant="body1">Departure
                                                    Time: {reservation.departureTime}</Typography>
                                                <Typography variant="body1">Arrival
                                                    Time: {reservation.arrivalTime}</Typography>
                                                <Typography variant="body1">Status: {reservation.status}</Typography>
                                                <Button variant="contained" color="error"
                                                        onClick={() => handleCancelReservation(reservation.reservationID)}
                                                >
                                                    Cancel
                                                </Button>
                                            </Box>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {cancelledReservations.length > 0 && (
                            <div>
                                <h2>Cancelled Reservations</h2>
                                <ul>
                                    {cancelledReservations.map((reservation) => (
                                        <li key={reservation.reservationID}>
                                            <Box
                                                sx={{
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px',
                                                    padding: '16px',
                                                    opacity: 0.7,
                                                }}
                                            >
                                                <Typography variant="h5">Departure
                                                    Location: {reservation.departureLocation}</Typography>
                                                <Typography
                                                    variant="body1">Destination: {reservation.destination}</Typography>
                                                <Typography variant="body1">Journey
                                                    Date: {reservation.journeyDate}</Typography>
                                                <Typography variant="body1">Booked
                                                    Seat: {reservation.bookedSeat}</Typography>
                                                <Typography variant="body1">Departure
                                                    Time: {reservation.departureTime}</Typography>
                                                <Typography variant="body1">Arrival
                                                    Time: {reservation.arrivalTime}</Typography>
                                                <Typography variant="body1">Status: {reservation.status}</Typography>

                                            </Box>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {expiredReservations.length > 0 && (
                            <div>
                                <h2>Expired Reservations</h2>
                                <ul>
                                    {expiredReservations.map((reservation) => (
                                        <li key={reservation.reservationID}>
                                            <Box
                                                sx={{
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px',
                                                    padding: '16px',
                                                    opacity: 0.7,
                                                }}
                                            >
                                                <Typography variant="h5">Departure
                                                    Location: {reservation.departureLocation}</Typography>
                                                <Typography
                                                    variant="body1">Destination: {reservation.destination}</Typography>
                                                <Typography variant="body1">Journey
                                                    Date: {reservation.journeyDate}</Typography>
                                                <Typography variant="body1">Booked
                                                    Seat: {reservation.bookedSeat}</Typography>
                                                <Typography variant="body1">Departure
                                                    Time: {reservation.departureTime}</Typography>
                                                <Typography variant="body1">Arrival
                                                    Time: {reservation.arrivalTime}</Typography>
                                                <Typography variant="body1">Status: {reservation.status}</Typography>
                                            </Box>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                {/*</div>*/}
            </div>
        </section>
    );
}

export default MyReservation;