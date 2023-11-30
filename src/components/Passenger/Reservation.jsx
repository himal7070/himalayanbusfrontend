import React, {useEffect, useState} from 'react';
import {addReservation, viewReservationsForCurrentUser} from "../../services/Passenger/ReservationService.jsx";
import '/src/styles/common/Dashboard.css'
// eslint-disable-next-line react/prop-types
function Reservation({ isCollapsible, toggleSidebar }) {



    const [formData, setFormData] = useState({
        departureLocation: '',
        destination: '',
        journeyDate: '',
        bookedSeat: 0,
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addReservation(formData);
            console.log('Reservation added:', response);
            setFormData({
                departureLocation: '',
                destination: '',
                journeyDate: '',
                bookedSeat: 0,
            });
        } catch (error) {
            console.error('Error adding reservation:', error.message);
        }
    };


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
                        <i className="bi-speedometer2"></i>
                        <span className="dashboard-name">Dashboard</span>
                    </div>
                    <h1>Welcome to Reservation Dashboard</h1>
                    <div>
                        <h2>Make a Reservation</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="departureLocation">Departure Location:</label>
                                <input
                                    type="text"
                                    id="departureLocation"
                                    name="departureLocation"
                                    value={formData.departureLocation}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="destination">Destination:</label>
                                <input
                                    type="text"
                                    id="destination"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="journeyDate">Journey Date:</label>
                                <input
                                    type="date"
                                    id="journeyDate"
                                    name="journeyDate"
                                    value={formData.journeyDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="bookedSeat">Booked Seats:</label>
                                <input
                                    type="number"
                                    id="bookedSeat"
                                    name="bookedSeat"
                                    value={formData.bookedSeat}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit">Add Reservation</button>
                        </form>
                    </div>
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
        </section>
    );
}
export default Reservation;