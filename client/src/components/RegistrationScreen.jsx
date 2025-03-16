import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { createUser } from '../api/userApi';
import './RegistrationScreen.css';

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
    <div id='registration-screen' className='container'>
      <h2>你是誰呢?</h2>
      <form id='registration-form' onSubmit={handleSubmit}>
        <input
          type='text'
          id='name-input'
          placeholder='輸入您的名稱吧~'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {error && (
          <Alert variant='danger' id='name-error' dismissible onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        <button type='submit' id='register-button'>
          送出
        </button>
      </form>
    </div>
  );
};

RegistrationScreen.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
};

export default RegistrationScreen;
