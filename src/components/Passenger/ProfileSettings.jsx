import React, {useEffect, useState} from 'react';
import '/src/styles/common/Dashboard.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '/src/styles/Passenger/MyProfile.css';
import {updatePassengerDetails} from "../../services/PassengerService.jsx";
import {decodeJwtToken} from "../Authentication/TokenDecoder.jsx";
import {toast} from "react-toastify";
import {getUserInformationByEmail, updatePasswordForUser} from "../../services/UserService.jsx";

// eslint-disable-next-line react/prop-types
function ProfileSettings({aryalNavCon}) {


    const userRoles = localStorage.getItem('userRoles');

    const [imageUrl, setImageUrl] = useState("");

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userEmail, setUserEmail] = useState('');


    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };

    const handlePasswordUpdate = async () => {
        try {
            const authToken = getAccessToken();
            if (authToken) {
                const updatedUser = await updatePasswordForUser(userEmail, oldPassword, newPassword, authToken);
                console.log('Updated password:', updatedUser);
                toast.success('Password updated successfully!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
                setOldPassword('');
                setNewPassword('');
            }
        } catch (error) {
            console.error('Error updating password:', error);

            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
            } else {
                toast.error('Failed to update password. Please try again later.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
            }
        }
    };






    useEffect(() => {
        const authToken = getAccessToken();
        if (authToken) {
            const decodedToken = decodeJwtToken(authToken);
            const userEmail = decodedToken.sub;
            setUserEmail(userEmail);

            getUserInformationByEmail(userEmail, authToken)
                .then(userData => {
                    const { firstName, lastName, phoneNumber } = userData;
                    setFirstName(firstName || '');
                    setLastName(lastName || '');
                    setPhoneNumber(phoneNumber || '');

                    const imageUrl = userData.imageProfileUrl || '';
                    setImageUrl(imageUrl);

                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, []);


    const handleSaveProfile = async () => {
        try {
            const authToken = getAccessToken();
            if (authToken) {
                const decodedToken = decodeJwtToken(authToken);
                const userID = decodedToken.userID;

                const updatedPassengerDetails = {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                };

                const updatedPassenger = await updatePassengerDetails(userID, updatedPassengerDetails, authToken);
                console.log('Updated passenger details:', updatedPassenger);

                setFirstName(updatedPassenger.firstName || '');
                setLastName(updatedPassenger.lastName || '');
                setPhoneNumber(updatedPassenger.phoneNumber || '');

                toast.success('Profile updated successfully!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error updating passenger details:', error);
            toast.error('Failed to update profile. Please try again later.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
            });
        }
    };




    return (
        <section className={`dashboard-section ${aryalNavCon ? 'body-area' : ''}`}>
            <div className={`dashboard-content ${aryalNavCon ? 'body-area' : ''}`}>
                <div className="dashboard-overview">
                    <div className="dashboard-title">
                        <i className="bi-gear"></i>
                        <span className="dashboard-name">Profile Settings</span>
                    </div>

                    {userRoles === 'USER' && (
                        <div className="container rounded bg-white mt-5 mb-5">
                            <div className="row">
                                <div className="col-md-3 border-right">
                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                        <img
                                            className="rounded-circle mt-5"
                                            width="150px"
                                            src={imageUrl || ""}
                                            alt="Profile"
                                        />
                                        <span className="font-weight-bold">{`${firstName} ${lastName}`}</span>
                                        <span className="text-black-50">{userEmail}</span>
                                        <span> </span>
                                    </div>
                                </div>
                                <div className="col-md-9 border-right">
                                    <div className="p-3 py-5">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h4 className="text-right">Profile Settings</h4>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label className="labels">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="first name"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="labels">Surname</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="last name"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label className="labels">Mobile Number</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="enter phone number"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-5 text-center">
                                            <button
                                                className="btn btn-primary profile-button"
                                                type="button"
                                                onClick={handleSaveProfile}
                                            >
                                                Save Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 py-5">
                                        <div className="d-flex justify-content-between align-items-center experience">
                                            <span>Update Password</span>
                                            <button className="btn btn-primary" onClick={handlePasswordUpdate}>
                                                Update Password
                                            </button>
                                        </div>
                                        <br/>
                                        <div className="col-md-12">
                                            <label className="labels">Old Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter old password"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                                autoComplete="current-password"
                                            />
                                            <br/>
                                            <label className="labels">New Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter new password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                autoComplete="new-password"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {userRoles === 'ADMIN' && (
                        <div className="col-md-4">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center experience">
                                    <span>Update Password</span>
                                    <button className="btn btn-primary" onClick={handlePasswordUpdate}>
                                        Update Password
                                    </button>
                                </div>
                                <br/>
                                <div className="col-md-12">
                                    <label className="labels">Old Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter old password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        autoComplete="current-password"
                                    />
                                    <br/>
                                    <label className="labels">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
        ;
}

export default ProfileSettings;