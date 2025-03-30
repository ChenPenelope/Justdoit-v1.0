import PropTypes from 'prop-types';
import React from 'react';

BetHistory.propTypes = {
  history: PropTypes.array.isRequired,
};

function BetHistory({ history }) {
  return (
    <div className='bet-history'>
      <div className='history-header'>投注歷史</div>
      <div className='history-list' id='history-list'>
        {[...history].reverse().map((item, index) => (
          <div key={index}>
            選項{item.option}, 籌碼: {item.amount} &nbsp;
            {item.isWin && <span className='result-win'>勝利+{item.amount}</span>}
            {!item.isWin && <span className='result-lose'>失敗-{item.amount}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BetHistory;
