import React, {useEffect, useState} from 'react';
import '/src/styles/common/Dashboard.css'
import '/src/styles/common/Table.css'
import {viewAllBus} from "../../services/BusService.jsx";


// eslint-disable-next-line react/prop-types
function Bus({ showNav }) {


    const [buses, setBuses] = useState([]);

    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };



    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const authToken = getAccessToken();
                const fetchedRoutes = await viewAllBus(authToken);
                setBuses(fetchedRoutes);
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
        };

        fetchRoutes().catch((error) => {
            console.error('Unhandled error in fetchPassengers:', error);
        });
    }, []);




    return (
        <section className={`dashboard-section ${showNav ? 'body-area' : ''}`}>
            <div className={`dashboard-content ${showNav ? 'body-area' : ''}`}>
                <div className="dashboard-overview">
                    <div className="dashboard-title">
                        <i className="bi-person-fill"></i>
                        <span className="dashboard-name">Bus</span>
                    </div>

                    <div className="bus-table-container">
                        <table>
                            <thead>
                            <tr>
                                <th>Bus Id</th>
                                <th>Bus Name</th>
                                <th>Driver Name</th>
                                <th>Bus Type</th>
                                <th>Route From</th>
                                <th>Route To</th>
                                <th>Journey Date</th>
                                <th>Departure Time</th>
                                <th>Arrival Time</th>
                                <th>Total Seats</th>
                                <th>Available Seats</th>
                                <th>Fare</th>
                            </tr>
                            </thead>
                            <tbody>
                            {buses.map((bus) => (
                                <tr key={bus.busId}>
                                    <td>{bus.busId}</td>
                                    <td>{bus.busName}</td>
                                    <td>{bus.driverName}</td>
                                    <td>{bus.busType}</td>
                                    <td>{bus.routeFrom}</td>
                                    <td>{bus.routeTo}</td>
                                    <td>{bus.journeyDate}</td>
                                    <td>{bus.departureTime}</td>
                                    <td>{bus.arrivalTime}</td>
                                    <td>{bus.totalSeats}</td>
                                    <td>{bus.availableSeats}</td>
                                    <td>{bus.fare}</td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Bus;