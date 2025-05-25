import PropTypes from 'prop-types';
import React from 'react';
import './BettingOption.css';

BettingOption.propTypes = {
  option: PropTypes.oneOf(['A', 'B']).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBet: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  phase: PropTypes.number.isRequired
};

function BettingOption({ option, value, onChange, onBet, disabled, phase }) {
  const getOptionText = (option, phase) => {
    const options = {
      1: {
        A: '兩份薯不辣一包金餃兩瓶可爾必思，一個草莓口味的哈根達斯還有鐵板麵，蘑菇口味的加蛋',
        B: '兩包薯不辣、一份抓餅、一罐八寶粥、香草口味的哈根達斯、黑胡椒鐵板麵加蛋'
      },
      2: {
        A: '蟑螂/ 12月12日 /19歲/ 11月',
        B: '蟋蟀/ 12月12日/15歲/ 12月'
      },
      3: {
        A: '選擇左邊的信封',
        B: '選擇右邊的信封'
      }
    };
    return options[phase]?.[option] || '';
  };

  return (
    <div className="betting-option">
      <div className="option-header">
        <h3>選項 {option}</h3>
      </div>
      
      <div className="option-content">
        <p className="option-text">{getOptionText(option, phase)}</p>
        
        <div className="betting-input">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="輸入投注金額"
            min="0"
            disabled={disabled}
          />
          <button
            onClick={onBet}
            disabled={disabled || !value || value <= 0}
            className="bet-button"
          >
            投注
          </button>
        </div>
      </div>
    </div>
  );
}

export default BettingOption;
