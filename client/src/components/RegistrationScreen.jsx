import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { createUser } from '../api/userApi';

const RegistrationScreen = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = name.trim();

    if (username) {
      try {
        await createUser(username);
        setCurrentUser(username);
        Cookies.set('username', username, { expires: 1 });
        navigate('/bet');
      } catch (err) {
        console.log(err);
        setError(err);
      }
    }
  };

  return (
    <div className='container screen'>
      <h2 className='purple-header-text'>你是誰呢?</h2>
      <Form
        id='registration-form'
        onSubmit={handleSubmit}
        className='w-100'
        style={{ maxWidth: '300px' }}
      >
        <Form.Control
          type='text'
          placeholder='輸入您的名稱吧~'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className='mb-4'
        />
        {error && (
          <Alert variant='danger' id='name-error' dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        <Button variant='primary' type='submit' onClick={handleSubmit} className='green-button'>
          送出
        </Button>
      </Form>
    </div>
  );
};

RegistrationScreen.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
};

export default RegistrationScreen;
