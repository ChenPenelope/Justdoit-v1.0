import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomeScreen() {
  const navigate = useNavigate();

  const goRegister = () => {
    navigate('/register');
  };

  return (
    <div className='container screen'>
      <h1 className='purple-header-text'>Let&apos;s Bet for Life!</h1>
      <button className='green-button' onClick={() => goRegister()}>
        開始ㄅ
      </button>
    </div>
  );
}

export default WelcomeScreen;
