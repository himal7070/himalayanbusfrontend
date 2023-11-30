import React from 'react';
import { GoogleLogin } from 'react-google-login';


// eslint-disable-next-line react/prop-types
const GoogleLoginButton = ({ handleGoogleLogin }) => {
    const responseGoogle = (response) => {

        handleGoogleLogin(response);
    };

    return (
        <GoogleLogin
            clientId="173869978547-q73vmauj4l721s016go0clsvao1mumha.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleLoginButton;
