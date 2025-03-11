import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';

function WelcomeScreen() {
  const navigate = useNavigate();

  const goRegister = () => {
    navigate('/register');
  };

  return (
    <div id='welcome-screen' className='container'>
      <h1>Let&apos;s Bet for Life!</h1>
      <button id='start-button' onClick={() => goRegister()}>
        開始ㄅ
      </button>
    </div>
  );
}

export default WelcomeScreen;
