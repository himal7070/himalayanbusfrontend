import React, {useEffect, useState} from 'react';
import '/src/styles/common/Dashboard.css'
import '/src/styles/common/Table.css'
import {getAllPassengers} from "../../services/PassengerService.jsx";


// eslint-disable-next-line react/prop-types
function Passenger({ aryalNavCon }) {
    const [passengers, setPassengers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };


    useEffect(() => {
        const fetchPassengers = async () => {
            try {
                const accessToken = getAccessToken();
                setTimeout(async () => {
                    const fetchedPassengers = await getAllPassengers(accessToken);
                    setPassengers(fetchedPassengers);
                    setLoading(false);
                }, 2000);

            } catch (error) {
                console.error('Error fetching passengers:', error);
                setLoading(false)
                throw error;
            }
        };
        fetchPassengers().catch((error) => {
            console.error('Unhandled error in fetchPassengers:', error);
        });
    }, []);



    return (
        <section className={`dashboard-section ${aryalNavCon ? 'body-area' : ''}`}>
            <div className={`dashboard-content ${aryalNavCon ? 'body-area' : ''}`}>
                <div className="dashboard-overview">
                    <div className="dashboard-title">
                        <i className="bi-person-fill"></i>
                        <span className="dashboard-name">Passengers</span>
                    </div>
                    <div className="passenger-table-container">
                        <table>
                            <thead>
                            <tr>
                                <th>User Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Reservation</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5">Loading...</td>
                                </tr>
                            ) : passengers.length === 0 ? (
                                <tr>
                                    <td colSpan="5">No passengers found</td>
                                </tr>
                            ) : (
                                passengers.map(passenger => (
                                    <tr key={passenger[0]}>
                                        <td>{passenger[0]}</td>
                                        <td>{passenger[1]}</td>
                                        <td>{passenger[2]}</td>
                                        <td>{passenger[3]}</td>
                                        <td>{passenger[4]}</td>
                                        <td>{passenger[5] ? passenger[5] : 'No reservation available'}</td>
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

export default Passenger;