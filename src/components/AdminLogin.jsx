import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(password)) {
      navigate('/list');
    }
    setError('Invalid password');
  };

  return (
    <div className='login-wrapper'>
      <div className='login-form-container'>
        <h2 className='login-title'>Admin Login</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter the admin password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant='primary' type='submit' className='login-button'>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

AdminLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default AdminLogin;
