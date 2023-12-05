import React, {useEffect, useState} from 'react';
import '/src/styles/common/Dashboard.css'
import '/src/styles/common/Table.css'
import {getAllRoutes} from "../../services/RouteService.jsx";


// eslint-disable-next-line react/prop-types
function Route({ isCollapsible, toggleSidebar }) {


    const [routes, setRoutes] = useState([]);

    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };



    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const authToken = getAccessToken();
                const fetchedRoutes = await getAllRoutes(authToken);
                setRoutes(fetchedRoutes);
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
        };

        fetchRoutes().catch((error) => {
            console.error('Unhandled error in fetchPassengers:', error);
        });
    }, []);




    return (
        <section className={`dashboard-section ${isCollapsible ? 'collapsible' : ''}`}>
            <div className={`dashboard-content ${isCollapsible ? 'collapsible' : ''}`}>
                <i className="bi-list sidebar-toggle" onClick={toggleSidebar}></i>
                <div className="dashboard-overview">
                    <div className="dashboard-title">
                        <i className="bi-person-fill"></i>
                        <span className="dashboard-name">Routes</span>
                    </div>

                    <div className="route-table-container">
                        <table>
                            <thead>
                            <tr>
                                <th>Route Id</th>
                                <th>Departure Location</th>
                                <th>Destination</th>
                                <th>Distance</th>
                            </tr>
                            </thead>
                            <tbody>
                            {routes.map((route) => (
                                <tr key={route.routeID}>
                                    <td>{route.routeID}</td>
                                    <td>{route.routeFrom}</td>
                                    <td>{route.routeTo}</td>
                                    <td>{route.distance}</td>
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
export default Route;