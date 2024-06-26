import React, {useState} from 'react';
import '/src/styles/common/Dashboard.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '/src/styles/Passenger/ReservationDashboard.css'
import '/src/styles/Passenger/MyReservation.css'
import {searchBusByRoute} from "../../services/BusService.jsx";
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {addReservation} from "../../services/ReservationService.jsx";
import {toast} from "react-toastify";

// eslint-disable-next-line react/prop-types
function ReservationDashboard({ aryalNavCon }) {


    const [routeFrom, setRouteFrom] = useState('');
    const [routeTo, setRouteTo] = useState('');
    const [busList, setBusList] = useState([]);
    const [journeyDate, setJourneyDate] = useState('');
    const [error, setError] = useState(null);


    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBus, setSelectedBus] = useState(null);


    const handleOpenDialog = (bus) => {
        setSelectedBus({
            ...bus,
            routeFrom: bus.routeFrom,
            routeTo: bus.routeTo,
            busId: bus.busId
        });
        setOpenDialog(true);
    };


    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };




    const handleSearch = async () => {
        try {

            if (routeFrom.trim() !== '' || routeTo.trim() !== '') {
                if ((routeFrom.trim() !== '' && routeTo.trim() !== '') || (routeFrom.trim() === '' && routeTo.trim() === '')) {
                    const accessToken = getAccessToken();
                    const buses = await searchBusByRoute(routeFrom, routeTo, accessToken, journeyDate);

                    if (Array.isArray(buses) && buses.length > 0) {
                        setBusList(buses);
                        setError(null);
                    } else {
                        setError('No buses found for the given route');
                        setBusList([]);
                    }
                } else {
                    setError('Please fill in all search fields.');
                    setBusList([]);
                }
            } else {
                setError('Please fill in all search fields.');
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



    // useEffect(() => {
    //     if (!routeFrom || !routeTo) {
    //         setBusList([]);
    //         setError(null);
    //         return;
    //     }
    //
    //     const searchTimeout = setTimeout(handleSearch, 500);
    //
    //     return () => clearTimeout(searchTimeout);
    // }, [routeFrom, routeTo, journeyDate]);




    const handleConfirmReservation = async (numberOfSeatsToBook) => {
        if (selectedBus && numberOfSeatsToBook) {
            const {journeyDate, routeFrom, routeTo, busId } = selectedBus;

            const reservationData = {
                journeyDate: journeyDate,
                departureLocation: routeFrom,
                destination: routeTo,
                bookedSeat: numberOfSeatsToBook,

                busId: busId,

            };

            try {
                const authToken = getAccessToken();
                const busId = selectedBus.busId;

                const addedReservation = await addReservation(reservationData, busId, authToken);

                if (addedReservation) {
                    const updatedBuses = busList.map((bus) => {
                        if (bus.busId === selectedBus.busId) {
                            return {
                                ...bus,
                                availableSeats: bus.availableSeats - numberOfSeatsToBook,
                            };
                        }
                        return bus;
                    });

                    setBusList(updatedBuses);

                    toast.success('Reservation added successfully!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    setOpenDialog(false);
                    console.log('Reservation added successfully:', addedReservation);
                }
            } catch (error) {
                console.error('Error adding reservation:', error);
            }
        } else {
            console.error('Selected bus or number of seats is missing.');
        }
    };


    const [numberOfSeatsToBook, setNumberOfSeatsToBook] = useState(1);

    const handleNumberOfSeatsChange = (event) => {
        const { value } = event.target;
        if (!isNaN(value) && parseInt(value) >= 1) {
            setNumberOfSeatsToBook(parseInt(value));
        }
    };


    const [routeFromSuggestions, setRouteFromSuggestions] = useState([]);
    const [routeToSuggestions, setRouteToSuggestions] = useState([]);

    const handleSearchRouteFrom = async (input) => {
        try {
            setRouteFrom(input);

            const accessToken = getAccessToken();
            const suggestions = await searchBusByRoute(input, '', accessToken);
            const uniqueRouteFromSuggestions = Array.from(new Set(suggestions.map((bus) => bus.routeFrom)));
            setRouteFromSuggestions(uniqueRouteFromSuggestions);


        } catch (error) {
            console.error('Error fetching suggestions for Route From:', error);
        }
    };

    const handleSearchRouteTo = async (input) => {
        try {
            setRouteTo(input);

            const accessToken = getAccessToken();
            const suggestions = await searchBusByRoute('', input, accessToken);
            const uniqueRouteToSuggestions = Array.from(new Set(suggestions.map((bus) => bus.routeTo)));
            setRouteToSuggestions(uniqueRouteToSuggestions);


        } catch (error) {
            console.error('Error fetching suggestions for Route To:', error);
        }
    };



    return (
        <section className={`dashboard-section ${aryalNavCon ? 'body-area' : ''}`}>
            <div className={`dashboard-content ${aryalNavCon ? 'body-area' : ''}`}>
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
                                <Autocomplete
                                    freeSolo
                                    options={routeFromSuggestions}
                                    onInputChange={(e, value) => handleSearchRouteFrom(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="busSearchInputField"
                                            type="text"
                                            value={routeFrom}
                                            onChange={(e) => setRouteFrom(e.target.value)}
                                            style={{width: '100%'}}
                                        />
                                    )}
                                />
                            </label>
                        </div>
                        <div className="busSearchInput">
                            <label className="busSearchLabel">
                                Route To:
                                <Autocomplete
                                    freeSolo
                                    options={routeToSuggestions}
                                    onInputChange={(e, value) => handleSearchRouteTo(value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className="busSearchInputField"
                                            type="text"
                                            value={routeTo}
                                            onChange={(e) => setRouteTo(e.target.value)}
                                        />
                                    )}
                                />
                            </label>
                        </div>

                        <div className="busSearchInput">
                            <label className="busSearchLabel">
                                Departure Date:
                                <TextField
                                    className="busSearchInputField"
                                    type="date"
                                    value={journeyDate}
                                    onChange={(e) => setJourneyDate(e.target.value)}
                                />
                            </label>
                        </div>

                        <button className="busSearchButton" onClick={handleSearch}>
                            Search
                        </button>
                        {error && <p className="busSearchError">Error: {error}</p>}
                        <br/>
                    </div>

                    <br/>

                    <div>

                        <div className="busListContainer">
                            {busList
                                .filter(bus =>
                                    bus.routeFrom === routeFrom && bus.routeTo === routeTo
                                )
                                .map(bus => (

                                <div key={bus.busId} className="busCard" onClick={() => handleOpenDialog(bus)}>
                                    {/*<h3>Bus Name:</h3>*/}
                                    <Box className="busCardContent">
                                        <Typography className="busCardName" fontSize="20px" fontWeight="bold">
                                            Bus Name: {bus.busName}
                                        </Typography>
                                        <Typography className="busJourneyDate" fontSize="15px">
                                            Departure Date: {bus.journeyDate}
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
                                            <Box className="busInfoBox">
                                                <Typography className="infoLabel" fontSize="15px" color="Black">
                                                    Departure Time
                                                </Typography>
                                                <Typography className="infoValue" fontSize="15px">
                                                    {bus.departureTime}
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
                        <Dialog open={openDialog} onClose={handleCloseDialog}>
                            <DialogTitle>Make Reservation</DialogTitle>

                            <DialogContent>
                                {selectedBus && (
                                    <div>
                                        <Typography variant="body1">Bus Name : {selectedBus.busName}</Typography>
                                        <Typography variant="body1">Departure Date
                                            : {selectedBus.journeyDate}</Typography>
                                        <Typography variant="body1">Ticket Price : {selectedBus.fare}</Typography>
                                        <Typography variant="body1">Route From : {selectedBus.routeFrom}</Typography>
                                        <Typography variant="body1">Route To : {selectedBus.routeTo}</Typography>
                                        <Typography variant="body1">Departure Time
                                            : {selectedBus.departureTime}</Typography>
                                        <Typography variant="body1">Arrival Time
                                            : {selectedBus.arrivalTime}</Typography>
                                    </div>
                                )}
                                <br/>
                                <TextField
                                    label="Number of Seats to Book"
                                    type="number"
                                    value={numberOfSeatsToBook}
                                    onChange={handleNumberOfSeatsChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>Cancel</Button>
                                <Button onClick={() => handleConfirmReservation(numberOfSeatsToBook)}>Confirm
                                    Reservation</Button>
                            </DialogActions>
                        </Dialog>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default ReservationDashboard;