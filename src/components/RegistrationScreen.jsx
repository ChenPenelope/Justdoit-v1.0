import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import './RegistrationScreen.css';
import db from '../DB';

RegistrationScreen.propTypes = {
  // onRegister: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

function RegistrationScreen({ setCurrentUser }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = name.trim();

    if (username) {
      setCurrentUser(username);
      db.saveUser(username);
    }
    navigate('/bet');
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
        <button type='submit' id='register-button'>
          送出
        </button>
      </form>
    </div>
  );
}

export default RegistrationScreen;
