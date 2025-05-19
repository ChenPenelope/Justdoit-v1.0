import React from 'react';
import PropTypes from 'prop-types';

function VotingResults({ results, phase, correctOptionPosition }) {
  const getOptionText = (phase, option) => {
    if (phase === 1) {
      return option === correctOptionPosition ? '兩份薯不辣一包金餃兩瓶可爾必思，一個草莓口味的哈根達斯還有鐵板麵，蘑菇口味的加蛋' : '兩包薯不辣、一份抓餅、一罐八寶粥、香草口味的哈根達斯、黑胡椒鐵板麵加蛋';
    } else if (phase === 2) {
      return option === correctOptionPosition ? '蟑螂/ 12月12日 /  19歲/ 11月' : '蟋蟀/ 12月12日/15歲/ 12月';
    } else {
      return option === 'A' ? '選擇左邊的信封' : '選擇右邊的信封';
    }
  };

  const isCorrectAnswer = (phase, option) => {
    if (phase === 1 || phase === 2) {
      return option === correctOptionPosition;
    }
    return false; // 第三階段沒有正確答案
  };

  return (
    <div className="voting-results">
      <h3>第 {phase} 階段投票結果</h3>
      <div className="bar-chart">
        <div className="bar-container">
          <div className="bar-label">
            {getOptionText(phase, 'A')}
            {isCorrectAnswer(phase, 'A') && <span className="correct-answer">✓ 正確答案</span>}
          </div>
          <div className="bar-wrapper">
            <div 
              className="bar" 
              style={{ 
                width: `${results.option1Percentage}%`,
                backgroundColor: '#6f42c1'
              }}
            >
              <span className="bar-value">{results.option1Percentage}%</span>
            </div>
          </div>
        </div>
        <div className="bar-container">
          <div className="bar-label">
            {getOptionText(phase, 'B')}
            {isCorrectAnswer(phase, 'B') && <span className="correct-answer">✓ 正確答案</span>}
          </div>
          <div className="bar-wrapper">
            <div 
              className="bar" 
              style={{ 
                width: `${results.option2Percentage}%`,
                backgroundColor: '#ff6384'
              }}
            >
              <span className="bar-value">{results.option2Percentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

VotingResults.propTypes = {
  results: PropTypes.object.isRequired,
  phase: PropTypes.number.isRequired,
  correctOptionPosition: PropTypes.string.isRequired,
};

export default VotingResults;
