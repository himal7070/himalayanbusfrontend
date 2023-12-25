import React, {useEffect, useState} from 'react';
import '/src/styles/common/Dashboard.css'
import '/src/styles/common/Table.css'
import {delayBusDeparture, viewAllBus} from "../../services/BusService.jsx";
import {sendNotification} from "../../services/WebSocketMessageService.jsx";

// eslint-disable-next-line react/prop-types
function Bus({ aryalNavCon }) {


    const [buses, setBuses] = useState([]);

    const [delayMinutes, setDelayMinutes] = useState(0);
    const [selectedBusId, setSelectedBusId] = useState(null);

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



    const handleDelayDeparture = async (busId, delay) => {
        try {
            const authToken = getAccessToken();
            await delayBusDeparture(busId, delayMinutes, authToken);

            const message = {
                busId: busId,
                message: 'Your bus departure time has been delayed!'
            };
            sendNotification(message);

            const updatedBuses = buses.map((bus) =>
                bus.busId === busId ? { ...bus, delayMinutes: delayMinutes } : bus
            );
            setBuses(updatedBuses);
            setSelectedBusId(null);
        } catch (error) {
            console.error('Error delaying departure:', error);
        }

    };




    return (
        <section className={`dashboard-section ${aryalNavCon ? 'body-area' : ''}`}>
            <div className={`dashboard-content ${aryalNavCon ? 'body-area' : ''}`}>


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
                                    <td>
                                        {selectedBusId === bus.busId ? (
                                            <>
                                                <input
                                                    type="number"
                                                    placeholder="Delay (min)"
                                                    onChange={(e) =>
                                                        setDelayMinutes(parseInt(e.target.value, 10))
                                                    }
                                                />
                                                <button
                                                    onClick={() => {
                                                        handleDelayDeparture(bus.busId, delayMinutes);
                                                    }}
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {bus.departureTime}{' '}
                                                <span style={{color: 'red'}}>
                                                {bus.delayMinutes > 0 ? `+${bus.delayMinutes}` : ''}
                                            </span>
                                                <button
                                                    onClick={() => {
                                                        setSelectedBusId(bus.busId);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </>
                                        )}
                                    </td>
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