import PropTypes from 'prop-types';
import React from 'react';

BettingOption.propTypes = {
  index: PropTypes.number.isRequired,
  option: PropTypes.string.isRequired,
  inputValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleBet: PropTypes.func.isRequired,
};

function BettingOption({ index, option, inputValues, handleInputChange, handleBet }) {
  return (
    <div className='betting-option' key={index}>
      <div className='option-header'>選項 {option}</div>
      
      <div className='bet-controls'>
        <input
          type='number'
          className='chip-input'
          min='1'
          value={inputValues[index] || ''}
          placeholder='投注籌碼'
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
        <button className='place-bet-button' onClick={() => handleBet(option, index, index)}>
          投注
        </button>
      </div>
    </div>
  );
}

export default BettingOption;
