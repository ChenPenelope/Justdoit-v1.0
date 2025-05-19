import PropTypes from 'prop-types';
import React from 'react';

BettingOption.propTypes = {
  index: PropTypes.number.isRequired,
  option: PropTypes.string.isRequired,
  phase: PropTypes.number.isRequired,
  inputValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleBet: PropTypes.func.isRequired,
  correctOptionPosition: PropTypes.string.isRequired,
};

function BettingOption({ index, option, phase, inputValues, handleInputChange, handleBet, correctOptionPosition }) {
  // 根據階段和選項顯示不同的文字
  const getOptionText = (option, phase) => {
    if (phase === 1) {
      // 第一階段的選項
      return option === correctOptionPosition ? '兩份薯不辣一包金餃兩瓶可爾必思，一個草莓口味的哈根達斯還有鐵板麵，蘑菇口味的加蛋' : '兩包薯不辣、一份抓餅、一罐八寶粥、香草口味的哈根達斯、黑胡椒鐵板麵加蛋';
    } else if (phase === 2) {
      // 第二階段的選項
      return option === correctOptionPosition ? '蟑螂/ 12月12日 /  19歲/ 11月' : '蟋蟀/ 12月12日/15歲/ 12月';
    } else {
      // 第三階段的選項
      return option === 'A' ? '選擇左邊的信封' : '選擇右邊的信封';
    }
  };

  const isCorrectAnswer = (option, phase) => {
    if (phase === 1 || phase === 2) {
      return option === correctOptionPosition;
    }
    return false; // 第三階段沒有正確答案
  };

  return (
    <div className='betting-option' key={index}>
      <div className='option-header'>
        {getOptionText(option, phase)}
      </div>
      {/*<p>獎金倍率: {index + 1.5}x</p>*/}
      <div className='bet-controls'>
        <input
          type='number'
          className='chip-input'
          min='1'
          value={inputValues[index] || ''}
          placeholder='投注籌碼'
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
        <button className='place-bet-button' onClick={() => handleBet(option, index)}>
          投注
        </button>
      </div>
    </div>
  );
}

export default BettingOption;
