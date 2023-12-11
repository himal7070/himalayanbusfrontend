import React, {useEffect, useState} from 'react';
import {decodeJwtToken} from "../Authentication/TokenDecoder.jsx";
import {Link} from "react-router-dom";
import {getUserInformationByEmail} from "../../services/UserService.jsx";
// eslint-disable-next-line react/prop-types
function MyProfileCard({showNav}) {


    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };


    const [userDetails, setUserDetails] = useState({});
    const [imageUrl, setImageUrl] = useState("");


    useEffect(() => {
        const fetchImage = async () => {
            try {
                const authToken = getAccessToken();
                if (authToken) {
                    const decodedToken = decodeJwtToken(authToken);
                    const userEmail = decodedToken.sub;
                    const userData = await getUserInformationByEmail(userEmail, authToken);
                    setUserDetails(userData);
                    const imageUrl = userData.imageProfileUrl;
                    setImageUrl(imageUrl);
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        fetchImage().catch((error) => {
            console.error('Unhandled error in fetchImage:', error);
        });
    }, []);



    return (
        <section className={`dashboard-section ${showNav ? 'body-area' : ''}`}>
            <div className={`dashboard-content ${showNav ? 'body-area' : ''}`}>
                <div className="dashboard-overview">
                    <div className="dashboard-title">
                        <i className="bi-card-image"></i>
                        <span className="dashboard-name">Profile Card</span>
                    </div>
                    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                        <div className="profile-card p-4">
                            <div className="profile-image d-flex flex-column justify-content-center align-items-center">
                                <button className="profile-image-button btn btn-secondary">
                                    <div className="card-img">
                                        {imageUrl ? (
                                            <img src={imageUrl} alt="User"/>
                                        ) : (
                                            <span>Loading image...</span>
                                        )}
                                    </div>
                                </button>
                                {userDetails.firstName && userDetails.lastName ? (
                                    <span
                                        className="profile-name mt-3">{`${userDetails.firstName} ${userDetails.lastName}`}</span>
                                ) : (
                                    <span className="profile-email mt-3">{userDetails.email || 'User Email'}</span>
                                )}
                                <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                                    <span className="profile-id">Oxc4c16a645_b21a</span>
                                    <span>
                                        <i className="fa fa-copy"></i>
                                    </span>
                                </div>
                                <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                                    <span className="profile-followers">1069</span>
                                    <span className="profile-followers-label">Followers</span>
                                </div>
                                <div className="d-flex mt-2">
                                    <Link to="/profile-settings" className="profile-edit-button btn-dark">
                                        Edit Profile</Link>
                                </div>
                                <div
                                    className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                                    <span>
                                        <i className="bi-twitter"></i>
                                    </span>
                                    <span>
                                        <i className="bi-facebook"></i>
                                    </span>
                                    <span>
                                        <i className="bi-instagram"></i>
                                    </span>
                                    <span>
                                        <i className="bi-linkedin"></i>
                                    </span>
                                </div>
                                <div className="px-2 rounded mt-4 profile-join-date-bg">
                                    <span className="profile-join-date">Joined May, 2021</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default MyProfileCard;