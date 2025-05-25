import React from 'react';
import PropTypes from 'prop-types';
import './VotingResults.css';

const VotingResults = ({ results, phase, correctOptionPosition }) => {
  const { option1Percentage, option2Percentage } = results;

  return (
    <div className="voting-results">
      <h3>第 {phase} 階段投票結果</h3>
      
      <div className="results-container">
        <div className="result-bar">
          <div className="option-label">選項 A</div>
          <div className="progress-bar">
            <div 
              className={`progress ${correctOptionPosition === 'A' ? 'correct' : ''}`}
              style={{ width: `${option1Percentage}%` }}
            >
              <span className="percentage">{option1Percentage}%</span>
            </div>
          </div>
        </div>

        <div className="result-bar">
          <div className="option-label">選項 B</div>
          <div className="progress-bar">
            <div 
              className={`progress ${correctOptionPosition === 'B' ? 'correct' : ''}`}
              style={{ width: `${option2Percentage}%` }}
            >
              <span className="percentage">{option2Percentage}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="result-summary">
        <p>正確選項: {correctOptionPosition}</p>
      </div>
    </div>
  );
};

VotingResults.propTypes = {
  results: PropTypes.shape({
    option1Percentage: PropTypes.number.isRequired,
    option2Percentage: PropTypes.number.isRequired
  }).isRequired,
  phase: PropTypes.number.isRequired,
  correctOptionPosition: PropTypes.oneOf(['A', 'B']).isRequired
};

export default VotingResults;

