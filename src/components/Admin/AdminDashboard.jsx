import React from 'react';
import '/src/styles/Admin/AdminDashboard.css'

// eslint-disable-next-line react/prop-types
function AdminDashboard({ isCollapsible }) {

    return (
        <section className={`dashboard-section ${isCollapsible ? 'collapsible' : ''}`}>
            <div className={`dashboard-content ${isCollapsible ? 'collapsible' : ''}`}>
                <div className="dashboard-overview">
                    <div className="dashboard-title">
                        <i className="uil-tachometer-fast-alt"></i>
                        <span className="dashboard-name">Dashboard Overview</span>
                    </div>
                    <div className="dashboard-boxes">
                        <div className="dashboard-box three">
                            <i className="fi-bs-user-gear"></i>
                            <span className="dashboard-name">Admins</span>
                            <span className="dashboard-number">--</span>
                        </div>
                        <div className="dashboard-box two">
                            <i className="fi-rr-memo-circle-check"></i>
                            <span className="dashboard-name">Reservations</span>
                            <span className="dashboard-number">--</span>
                        </div>
                        <div className="dashboard-box three">
                            <i className="fi-rr-envelope-dot"></i>
                            <span className="dashboard-name">Feedbacks</span>
                            <span className="dashboard-number">--</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '25px' }} className="dashboard-boxes">
                        <div className="dashboard-box one">
                            <i className="fi-rr-portrait"></i>
                            <span className="dashboard-name">Users Info</span>
                            <span className="dashboard-number">--</span>
                        </div>
                        <div className="dashboard-box one">
                            <i className="fi-rs-bus-alt"></i>
                            <span className="dashboard-name">Buses</span>
                            <span className="dashboard-number">--</span>
                        </div>
                        <div className="dashboard-box two">
                            <i className="fi-rr-route"></i>
                            <span className="dashboard-name">Routes Details</span>
                            <span className="dashboard-number">--</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AdminDashboard;
