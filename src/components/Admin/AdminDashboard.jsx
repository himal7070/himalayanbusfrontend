import React from 'react';
import '/src/styles/Admin/AdminDashboard.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

// eslint-disable-next-line react/prop-types
function AdminDashboard({ isCollapsible , toggleSidebar}) {


    return (
        <section className={`dashboard-section ${isCollapsible ? 'collapsible' : ''}`}>
            <div className={`dashboard-content ${isCollapsible ? 'collapsible' : ''}`}>
                <i className="bi-list sidebar-toggle" onClick={toggleSidebar}></i>
                <div className="dashboard-overview">
                    <div className="dashboard-title">
                        <i className="bi-speedometer2"></i>
                        <span className="dashboard-name">Dashboard Overview</span>
                    </div>
                    <div className="dashboard-boxes">
                        <div className="dashboard-box three">
                            <i className="bi-person-fill"></i>
                            <span className="dashboard-name">Admins</span>
                            <span className="dashboard-number">--</span>
                        </div>
                        <div className="dashboard-box two">
                            <i className="bi-check-circle-fill"></i>
                            <span className="dashboard-name">Reservations</span>
                            <span className="dashboard-number">--</span>
                        </div>
                        <div className="dashboard-box three">
                            <i className="bi-envelope-check"></i>
                            <span className="dashboard-name">Feedbacks</span>
                            <span className="dashboard-number">--</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '30px' }} className="dashboard-boxes">
                        <div className="dashboard-box one">
                            <i className="bi-person-circle"></i>
                            <span className="dashboard-name">Users Info</span>
                            <span className="dashboard-number">--</span>
                        </div>
                        <div className="dashboard-box one">
                            <i className="bi-bus-front-fill"></i>
                            <span className="dashboard-name">Buses</span>
                            <span className="dashboard-number">--</span>
                        </div>
                        <div className="dashboard-box two">
                            <i className="bi-geo-alt-fill"></i>
                            <span className="dashboard-name">Routes</span>
                            <span className="dashboard-number">--</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AdminDashboard;
