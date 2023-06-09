import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ChangePassword() {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailOrUsername === '') {
      setErrorMessage('Please enter your email or username.');
      return;
    }

    if (currentPassword === '') {
      setErrorMessage('Please enter your current password.');
      return;
    }

    if (newPassword === '') {
      setErrorMessage('Please enter a new password.');
      return;
    }

    if (confirmPassword === '') {
      setErrorMessage('Please confirm your new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    try {

      const response = await axios.put(`http://localhost:8000/update/${emailOrUsername}`, {
        newPassword: newPassword,
      });

      setEmailOrUsername('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      setSuccessMessage('Password updated successfully.'); 

      alert('Password updated Successfully', response.data);
    } catch (error) {

      console.error('Error updating password:', error);
      setErrorMessage('Failed to update password. Please try again.');
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF, #E3FCE9, #BEF7CC)', height: '100vh' }}>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: "linear-gradient(to right, #9DC88D, #05652D)" }}>
        <img src={process.env.PUBLIC_URL + "/AppLogo.png"} width="240" height="60" className="d-inline-block align-top" alt="Logo" style={{ marginLeft: "50px" }} />

        <div className="container">
          <div className="d-flex justify-content-end align-items-center w-100">
            <ul className="navbar-nav flex-row" >
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Container className="d-flex justify-content-center align-items-center mt-5">
        <div className="col-sm-4">
          <Card style={{ background: 'linear-gradient(#05652D, #1F7A3E, #37AF4E)', padding: '20px', borderRadius: '10px' }}>
            <h2 style={{ color: 'white', textAlign: 'center' }}>CHANGE PASSWORD</h2>
            {errorMessage && <div style={{ color: 'red'}} className="error">{errorMessage}</div>}
            {successMessage && <div  style={{ color: 'orange'}} className="success">{successMessage}</div>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="emailOrUsername">
                <Form.Label style={{ color: "white" }}>Email/Username</Form.Label>
                <Form.Control
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="Email or Username"
                />
              </Form.Group>
              <Form.Group controlId="currentPassword">
                <Form.Label style={{ color: "white" }}>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current Password"
                />
              </Form.Group>

              <Form.Group controlId="newPassword">
                <Form.Label style={{ color: "white" }}>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label style={{ color: "white" }}>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </Form.Group>

              <div className="d-flex justify-content-center mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: 'white', color: '#05652D', width: '300px' }}
                >
                  Change Password
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default ChangePassword;