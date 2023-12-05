import React, {useState} from 'react';
import '/src/styles/common/Dashboard.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '/src/styles/Passenger/ReservationDashboard.css'
import '/src/styles/Passenger/MyReservation.css'
import {searchBusByRoute} from "../../services/BusService.jsx";
// eslint-disable-next-line react/prop-types
function Reservation({ isCollapsible, toggleSidebar }) {


    const [routeFrom, setRouteFrom] = useState('');
    const [routeTo, setRouteTo] = useState('');
    const [busList, setBusList] = useState([]);
    const [error, setError] = useState(null);

    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };


    const handleSearch = async () => {
        try {
            const accessToken = getAccessToken();
            const buses = await searchBusByRoute(routeFrom, routeTo, accessToken);

            if (Array.isArray(buses) && buses.length > 0) {
                setBusList(buses);
                setError(null);
            } else {
                setError('No buses found for the given route');
                setBusList([]);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while searching for buses.');
            }
            setBusList([]);
        }
    };








    return (
        <section className={`dashboard-section ${isCollapsible ? 'collapsible' : ''}`}>
            <div className={`dashboard-content ${isCollapsible ? 'collapsible' : ''}`}>
                <i className="bi-list sidebar-toggle" onClick={toggleSidebar}></i>
                <div className="dashboard-overview">
                    <div className="dashboard-title">
                        <i className="bi-speedometer2"></i>
                        <span className="dashboard-name">Dashboard</span>
                    </div>

                    <div className="busSearchContainer">
                        <h2>Search Buses</h2>
                        <br/>
                        <div className="busSearchInput">
                            <label className="busSearchLabel">
                                Route From:
                                <input
                                    className="busSearchInputField"
                                    type="text"
                                    value={routeFrom}
                                    onChange={(e) => setRouteFrom(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="busSearchInput">
                            <label className="busSearchLabel">
                                Route To:
                                <input
                                    className="busSearchInputField"
                                    type="text"
                                    value={routeTo}
                                    onChange={(e) => setRouteTo(e.target.value)}
                                />
                            </label>
                        </div>
                        <button className="busSearchButton" onClick={handleSearch}>
                            Search
                        </button>

                        {error && <p className="busSearchError">Error: {error}</p>}
                    </div>

                    <br/>

                        <div>

                            <div className="busListContainer">
                                {busList.map((bus) => (

                                    <div key={bus.busId} className="busCard">
                                        {/*<h3>Bus Name:</h3>*/}
                                        <Box className="busCardContent">
                                            <Typography className="busCardName" fontSize="20px" fontWeight="bold">
                                                Bus Name: {bus.busName}
                                            </Typography>
                                            <Typography className="busJourneyDate" fontSize="15px">
                                                Date: {bus.journeyDate}
                                            </Typography>
                                            <Box className="busAdditionalInfo">
                                                <Box className="busInfoBox">
                                                    <Typography className="infoLabel" fontSize="15px" color="Black">
                                                        Ticket Price
                                                    </Typography>
                                                    <Typography className="infoValue" fontSize="15px">
                                                        {bus.fare + "Є"}
                                                    </Typography>
                                                </Box>
                                                <Box className="himalayanBusSeatsAvailability">
                                                    <Typography className="infoLabel" fontSize="15px" color="Black">
                                                        Available Seats
                                                    </Typography>
                                                    <Typography className="infoValue" fontSize="15px">
                                                        {bus.availableSeats}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </div>
                                ))}
                            </div>
                        </div>

                </div>
            </div>
        </section>
    );
}
export default Reservation;