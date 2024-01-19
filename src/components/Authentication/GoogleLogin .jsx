//
// import React, { useEffect } from 'react';
//
// // eslint-disable-next-line react/prop-types
// const GoogleLoginButton = ({ onGoogleLogin }) => {
//     useEffect(() => {
//         // Initialize Google Sign-In when the component mounts
//         window.gapi.load('auth2', () => {
//             window.gapi.auth2.init({
//                 client_id: '868445236582-b7evlbu6rp80r9852ieimlnp7d72g9jv.apps.googleusercontent.com',
//             });
//         });
//     }, []);
//
//     const handleGoogleLogin = async () => {
//         try {
//             const auth2 = window.gapi.auth2.getAuthInstance();
//             const googleUser = await auth2.signIn();
//
//             // Retrieve the user's email from the Google user object
//             const googleUserEmail = googleUser.getBasicProfile().getEmail();
//
//             // Pass the email to the onGoogleLogin callback
//             onGoogleLogin(googleUserEmail);
//         } catch (error) {
//             console.error('Google login error:', error);
//         }
//     };
//
//     return (
//         <div className="google-login-button" onClick={handleGoogleLogin}>
//             {/* You can style this div to look like a Google Sign-In button */}
//             Google Sign-In
//         </div>
//     );
// };
//
// export default GoogleLoginButton;
