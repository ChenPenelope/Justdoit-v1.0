import React from 'react';
import PropTypes from 'prop-types';
import './BetHistory.css';

const BetHistory = ({ history }) => {
    const getPhaseText = (phase) => {
        switch (phase) {
            case 1:
                return '第一輪';
            case 2:
                return '第二輪';
            case 3:
                return '第三輪';
            default:
                return '未知';
        }
    };

  return (
        <div className="bet-history">
            <h3>投注歷史</h3>
            <div className="history-list">
                {history.slice().reverse().map((item, index) => (
                    <div key={index} className="history-item">
                        <span className="phase">{getPhaseText(item.phase)}</span>
                        <span className="option">{item.option}</span>
                        <span className="amount">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

BetHistory.propTypes = {
    history: PropTypes.arrayOf(
        PropTypes.shape({
            phase: PropTypes.number.isRequired,
            option: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            created_at: PropTypes.string.isRequired
        })
    ).isRequired
};

export default BetHistory;
