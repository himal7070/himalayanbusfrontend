import React from 'react';
import AdminSidebar from "./AdminSidebar.jsx";
import '/src/styles/Admin/AdminDashboard.css'
import PropTypes from "prop-types";

function AdminDashboard({ isCollapsible }) {

    console.log('isCollapsible:', isCollapsible);
    return (
        <div>
            <AdminSidebar />
            <section className={`dashboard-section ${isCollapsible ? 'collapsible' : ''}`}>
                <div className="dashboard-content">
                    <div className="dashboard-overview">
                        <div className="dashboard-title">
                            <i className="uil-tachometer-fast-alt"></i>
                            <span className="dashboard-name">Dashboard Overview</span>
                        </div>

                        <div className="dashboard-boxes">
                            <div className="dashboard-box three">
                                <i className="fi-bs-user-gear"></i>
                                <span className="dashboard-name">Admin Statistics</span>
                                <span className="dashboard-number">--</span>
                            </div>

                            <div className="dashboard-box two">
                                <i className="fi-rr-memo-circle-check"></i>
                                <span className="dashboard-name">Reservation Details</span>
                                <span className="dashboard-number">--</span>
                            </div>

                            <div className="dashboard-box three">
                                <i className="fi-rr-envelope-dot"></i>
                                <span className="dashboard-name">Feedback Analysis</span>
                                <span className="dashboard-number">--</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '25px' }} className="dashboard-boxes">
                            <div className="dashboard-box one">
                                <i className="fi-rr-portrait"></i>
                                <span className="dashboard-text">User Information</span>
                                <span className="dashboard-number">--</span>
                            </div>
                            <div className="dashboard-box one">
                                <i className="fi-rs-bus-alt"></i>
                                <span className="dashboard-text">Bus Management</span>
                                <span className="dashboard-number">--</span>
                            </div>
                            <div className="dashboard-box two">
                                <i className="fi-rr-route"></i>
                                <span className="dashboard-text">Route Details</span>
                                <span className="dashboard-number">--</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

AdminDashboard.propTypes = {
    isCollapsible: PropTypes.bool.isRequired,
};

export default AdminDashboard;
