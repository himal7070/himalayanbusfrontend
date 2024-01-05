import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@material-ui/core';
import { completePasswordReset } from '../../services/UserService.jsx';
import '/src/styles/Authentication/ForgotPasswordStyles.css';
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await completePasswordReset(email, resetToken, newPassword);
      console.log('Password reset completed successfully.');

      toast.success('Password reset completed successfully. You can now log in with your new password.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error completing password reset:', error);
    }
  };

  return (
      <Container component="main" maxWidth="sm" className="container">
        <Typography component="h2" variant="h5">
          Reset Password
        </Typography>
        <br/>
        <Typography variant="body2" align="center" style={{color: 'red'}}>
          Please check your email for the reset token verification.
        </Typography>
        <form onSubmit={handleResetPassword} className="form">
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
              onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="resetToken"
              label="Reset Token"
              name="resetToken"
              autoComplete="resetToken"
              value={resetToken}
              onChange={(e) => setResetToken(e.target.value)}
          />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
          />
          <br/>
          <br/>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
          >
            Reset Password
          </Button>
          <br/>
          <br/>
          <Typography>
            <Link to="/" variant="body2">
              Click here to login
            </Link>
          </Typography>
        </form>
      </Container>
  );
}

export default ResetPassword;
