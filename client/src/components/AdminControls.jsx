import React from 'react';
import PropTypes from 'prop-types';
import './AdminControls.css';

function AdminControls({ onStartNextPhase, bettingPhase, isAdmin, currentPhase, timeLeft }) {
  if (!isAdmin) return null;

  return (
    <div className="admin-controls">
      <div className="admin-info">
        <span className="admin-badge">管理員控制面板</span>
        <span className="phase-info">當前階段: {currentPhase}/3</span>
        <span className="time-info">剩餘時間: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
      </div>
      
      <button 
        className="admin-button"
        onClick={onStartNextPhase}
        disabled={timeLeft > 0}
      >
        {currentPhase < 3 ? '開始下一階段' : '開始新一輪'}
      </button>
    </div>
  );
}

AdminControls.propTypes = {
  onStartNextPhase: PropTypes.func.isRequired,
  bettingPhase: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  currentPhase: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired
};

export default AdminControls; 