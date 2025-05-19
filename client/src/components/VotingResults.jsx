import React from 'react';

function VotingResults({ results, phase }) {
  const getOptionText = (phase, option) => {
    if (phase === 1) {
      return option === 'A' ? '兩份薯不辣一包金餃兩瓶可爾必思，一個草莓口味的哈根達斯還有鐵板麵，蘑菇口味的加蛋' : '兩包薯不辣、一份抓餅、一罐八寶粥、香草口味的哈根達斯、黑胡椒鐵板麵加蛋';
    } else {
      return option === 'A' ? '單' : '雙';
    }
  };

  return (
    <div className="voting-results">
      <h3>第 {phase} 階段投票結果</h3>
      <div className="bar-chart">
        <div className="bar-container">
          <div className="bar-label">{getOptionText(phase, 'A')}</div>
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
          <div className="bar-label">{getOptionText(phase, 'B')}</div>
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

export default VotingResults;
