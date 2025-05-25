import React from 'react';
import PropTypes from 'prop-types';
import './BetHistory.css';

function BetHistory({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="bet-history">
        <h3>投注歷史</h3>
        <p className="no-history">尚無投注記錄</p>
      </div>
    );
  }

  return (
    <div className="bet-history">
      <h3>投注歷史</h3>
      <div className="history-list">
        {history.map((bet, index) => (
          <div key={index} className="history-item">
            <div className="history-phase">第 {bet.phase} 階段</div>
            <div className="history-details">
              <span className="history-option">選項 {bet.option}</span>
              <span className="history-amount">{bet.amount} 籌碼</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

BetHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      phase: PropTypes.number.isRequired,
      option: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    })
  ).isRequired
};

export default BetHistory;
