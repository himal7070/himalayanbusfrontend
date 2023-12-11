import React, {useEffect, useState} from 'react';
import '/src/styles/common/Dashboard.css'
import '/src/styles/common/Table.css'
import {getAllReservations} from "../../services/ReservationService.jsx";


// eslint-disable-next-line react/prop-types
function AdminReservation({ showNav }) {

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };


  useEffect(() => {
    const fetchedReservation = async () => {
      try {
        const accessToken = getAccessToken();
        const fetchedReservation = await getAllReservations(accessToken);
        setReservations(fetchedReservation);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Reservation:', error);
        setLoading(false)
        throw error;
      }
    };
    fetchedReservation().catch((error) => {
      console.error('Unhandled error in fetchReservation:', error);
    });
  }, []);


  return (
      <section className={`dashboard-section ${showNav ? 'body-area' : ''}`}>
        <div className={`dashboard-content ${showNav ? 'body-area' : ''}`}>
          <div className="dashboard-overview">
            <div className="dashboard-title">
              <i className="bi-person-fill"></i>
              <span className="dashboard-name">Reservations</span>
            </div>
            <div className="reservation-table-container">
              <table>
                <thead>
                <tr>
                  <th>Reservation Id</th>
                  <th>Departure From</th>
                  <th>Destination</th>
                  <th>Journey Date</th>
                  <th>Total Seats</th>
                  <th>Total Fare</th>
                  <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {loading ? (
                    <tr>
                      <td colSpan="7">Loading...</td>
                    </tr>
                ) : reservations.length === 0 ? (
                    <tr>
                      <td colSpan="7">No Reservation found</td>
                    </tr>
                ) : (
                    reservations.map(reservation => (
                        <tr key={reservation.reservationID}>
                          <td>{reservation.reservationID}</td>
                          <td>{reservation.departureLocation}</td>
                          <td>{reservation.destination}</td>
                          <td>{reservation.journeyDate}</td>
                          <td>{reservation.bookedSeat}</td>
                          <td>{reservation.fare}</td>
                          <td>{reservation.status}</td>
                        </tr>
                    ))
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
  );
}

export default AdminReservation;