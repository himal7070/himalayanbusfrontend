import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import { resetUserPassword } from '../../services/UserService.jsx';
import "/src/styles/Authentication/ForgotPasswordStyles.css"
import {Link} from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        try {
            await resetUserPassword(email);
            console.log('Password reset initiated successfully.');
            window.location.href = '/reset-password';
        } catch (error) {
            console.error('Error initiating password reset:', error);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleLinkClick = (e) => {
        e.preventDefault();
        handleResetPassword();
    };

    return (
        <Container component="main" maxWidth="sm" className="container">
            <Typography component="h2" variant="h5">
                Password Reset
            </Typography>
            <form className="form">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                />

                <Link to="/reset-password" onClick={handleLinkClick} style={{ textDecoration: 'none' }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                    >
                        Reset Password
                    </Button>
                </Link>
            </form>
        </Container>
    );
}

export default ForgotPassword;
