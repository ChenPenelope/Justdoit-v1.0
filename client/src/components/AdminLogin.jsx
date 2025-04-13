import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
    <div className='screen'>
      <div className='bg-light p-4 rounded w-100 shadow' style={{ maxWidth: '400px' }}>
        <h2 className='mb-4 text-center'>Admin Login</h2>
        <Form onSubmit={handleSubmit} className='px-3 pt-2'>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Control
              type='password'
              placeholder='Enter the admin password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mb-3'
            />
          </Form.Group>
          {error && (
            <Alert variant='danger' dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <Button variant='primary' type='submit' className='w-100'>
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
