import React from 'react';
import { Link } from 'react-router-dom';
import '/src/styles/common/LandingPage.css'



const LandingPage = () => {
    return (
        <header className="bus-reservation-header">
            <video className="video-background" autoPlay loop muted>
                <source src="/routeTravel.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="content-overlay">
                <h1 className="main-title text-center">Explore the Himalayan Bus Experience</h1>
                <p className="sub-title text-center">Choose us for a superior travel experience</p>
                <div className="buttons text-center">
                    <Link to="/login">
                        <button className="primary-button">Log In / Sign Up</button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default LandingPage;
