import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { getUserByName, updateUserChips } from '../api/userApi';
import BetHistory from './BetHistory';
import BettingOption from './BettingOption';
import VotingResults from './VotingResults';
import './BettingScreen.css';

BettingScreen.propTypes = {
  currentUser: PropTypes.string.isRequired,
};

function BettingScreen({ currentUser }) {
  const [chipCount, setChipCount] = useState(1000);
  const [history, setHistory] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5分鐘
  const [bettingPhase, setBettingPhase] = useState(1); // 1: 第一階段, 2: 第二階段
  const [bettingOpen, setBettingOpen] = useState(true);
  const [roundResults, setRoundResults] = useState(null);
  const [bets, setBets] = useState({ option1: 0, option2: 0 });
  
  currentUser = currentUser || Cookies.get('username');

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByName(currentUser);
      setUser(user);
      setHistory(user?.history || []);
      setChipCount(user?.chips || 1000);
    };
    fetchUser();
  }, [currentUser]);

  // 倒計時效果
  useEffect(() => {
    if (timeLeft > 0 && bettingOpen) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setBettingOpen(false);
      calculateResults();
    }
  }, [timeLeft, bettingOpen]);

  const calculateResults = () => {
    const totalBets = bets.option1 + bets.option2;
    const results = {
      option1Percentage: Math.round((bets.option1 / totalBets) * 100) || 0,
      option2Percentage: Math.round((bets.option2 / totalBets) * 100) || 0
    };
    setRoundResults(results);
  };

  const startNextPhase = () => {
    if (bettingPhase === 1) {
      setBettingPhase(2);
      setTimeLeft(300);
      setBettingOpen(true);
      setRoundResults(null);
      setBets({ option1: 0, option2: 0 });
    } else {
      setBettingPhase(1);
      setTimeLeft(300);
      setBettingOpen(true);
      setRoundResults(null);
      setBets({ option1: 0, option2: 0 });
    }
  };

  const handleBet = (option, index) => {
    const amount = parseInt(inputValues[index]);
    if (isNaN(amount) || amount <= 0) {
      alert('請輸入有效的投注籌碼');
      return;
    }

    if (chipCount < amount) {
      alert('籌碼不足!');
      return;
    }

    if (!bettingOpen) {
      alert('本階段投注已結束！');
      return;
    }

    var newChips = chipCount - amount;
    setChipCount(newChips);
    updateUserChips(user.id, newChips);

    // 更新投注統計
    setBets(prev => ({
      ...prev,
      [option === 'A' ? 'option1' : 'option2']: 
        prev[option === 'A' ? 'option1' : 'option2'] + amount
    }));

    // Update history
    const newHistory = [...history, { 
      currentUser, 
      option, 
      amount, 
      phase: bettingPhase 
    }];
    setHistory(newHistory);

    // clear the input
    setInputValues((prevValues) => ({
      ...prevValues,
      [index]: '',
    }));
  };

  const handleInputChange = (index, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [index]: value,
    }));
  };

  const bettingOptions = ['A', 'B'];

  return (
    <div id='betting-screen' className='container'>
      <div className='header'>
        <div className='user-info'>
          <div className='username purple-text' id='display-username'>
            {currentUser}
          </div>
          <div className='chip-counter'>
            籌碼: <span id='chip-count'>{chipCount}</span>
          </div>
        </div>
        <div id='game-status'>
          {bettingOpen ? (
            `第 ${bettingPhase} 階段 - 剩餘時間: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`
          ) : (
            '等待下一階段...'
          )}
        </div>
      </div>

      {!bettingOpen && roundResults && (
        <div className="results-container">
          <VotingResults results={roundResults} phase={bettingPhase} />
          <button onClick={startNextPhase} className='new-round-button'>
            {bettingPhase === 1 ? '進入第二階段' : '開始新一輪'}
          </button>
        </div>
      )}

      {bettingOpen && (
        <div className='betting-options'>
          {bettingOptions.map((option, index) => (
            <BettingOption
              key={option}
              index={index}
              option={option}
              phase={bettingPhase}
              inputValues={inputValues}
              handleInputChange={handleInputChange}
              handleBet={handleBet}
            />
          ))}
        </div>
      )}

      <BetHistory history={history} />
    </div>
  );
}

export default BettingScreen;