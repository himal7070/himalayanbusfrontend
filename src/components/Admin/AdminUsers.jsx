import React from 'react';
import '/src/styles/Admin/AdminDashboard.css'
import '/src/styles/Admin/Table.css'

// eslint-disable-next-line react/prop-types
function Users({ isCollapsible, toggleSidebar }) {



    return (
        <section className={`dashboard-section ${isCollapsible ? 'collapsible' : ''}`}>
            <div className={`dashboard-content ${isCollapsible ? 'collapsible' : ''}`}>
                <i className="bi-list sidebar-toggle" onClick={toggleSidebar}></i>
                <div className="dashboard-overview">
                    <div className="dashboard-title">
                        <i className="bi-person-fill"></i>
                        <span className="dashboard-name">Users</span>
                    </div>
                    <div className="user-table-container" id="user-table-container">
                        <table>
                            <thead>
                            <tr className="table-header">
                                <th className="column1">User Id</th>
                                <th className="column2">First Name</th>
                                <th className="column3">Last Name</th>
                                <th className="column4">Mobile</th>
                                <th className="column5">Email</th>
                                <th className="column6">Reservations</th>
                                <th className="column7">FeedBacks</th>
                                <th className="column8">Delete</th>
                            </tr>
                            </thead>
                            <tbody className="user-data">
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Users;
