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
        } catch (error) {
            console.error('Error initiating password reset:', error);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <Container component="main" maxWidth="sm" className="container">
            <Typography component="h2" variant="h5">
                Password Reset
            </Typography>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleResetPassword();
            }} className="form">
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

                <Link to="/reset-password" style={{ textDecoration: 'none' }}>
                    <Button
                        type="submit"
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
