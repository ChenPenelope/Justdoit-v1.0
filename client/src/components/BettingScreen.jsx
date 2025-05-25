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
  const [timeLeft, setTimeLeft] = useState(180); // 3分鐘
  const [bettingPhase, setBettingPhase] = useState(1); // 1: 第一階段, 2: 第二階段, 3: 第三階段
  const [bettingOpen, setBettingOpen] = useState(true);
  const [roundResults, setRoundResults] = useState(null);
  const [bets, setBets] = useState({ option1: 0, option2: 0 });
  const [correctOptionPosition, setCorrectOptionPosition] = useState('A'); // 'A' 或 'B'，表示正確答案的位置
  const [bettingHistory, setBettingHistory] = useState([]);
  
  currentUser = currentUser || Cookies.get('username');

  // 隨機決定正確答案的位置
  const randomizeCorrectOptionPosition = () => {
    setCorrectOptionPosition(Math.random() < 0.5 ? 'A' : 'B');
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByName(currentUser);
      setUser(user);
      setHistory(user?.history || []);
      setChipCount(user?.chips || 1000);
    };
    fetchUser();
    randomizeCorrectOptionPosition(); // 初始化時隨機決定位置
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
    if (bettingPhase < 3) {
      setBettingPhase(bettingPhase + 1);
      setTimeLeft(180);
      setBettingOpen(true);
      setRoundResults(null);
      setBets({ option1: 0, option2: 0 });
      randomizeCorrectOptionPosition(); // 進入新階段時重新隨機決定位置
    } else {
      setBettingPhase(1);
      setTimeLeft(180);
      setBettingOpen(true);
      setRoundResults(null);
      setBets({ option1: 0, option2: 0 });
      randomizeCorrectOptionPosition(); // 開始新一輪時重新隨機決定位置
    }
  };

  const handleBet = async (option) => {
    if (bettingPhase === 'results') return;
    
    try {
        const response = await fetch(`/api/users/${user.id}/bet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                option,
                amount: betAmount,
                phase: bettingPhase === 'phase1' ? 1 : bettingPhase === 'phase2' ? 2 : 3
            }),
        });

        if (!response.ok) {
            throw new Error('投注失敗');
        }

        const data = await response.json();

        // 更新用戶籌碼
        setUser(prev => ({
      ...prev,
            chips: data.chips
    }));

        // 添加投注歷史
        const historyResponse = await fetch(`/api/users/${user.id}/history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
      option, 
                amount: betAmount,
                phase: bettingPhase === 'phase1' ? 1 : bettingPhase === 'phase2' ? 2 : 3
            }),
        });

        if (!historyResponse.ok) {
            throw new Error('保存投注歷史失敗');
        }

        const historyData = await historyResponse.json();
        setBettingHistory(prev => [...prev, historyData]);

    } catch (error) {
        console.error('投注錯誤:', error);
        alert(error.message);
    }
  };

  // 在組件加載時獲取投注歷史
  useEffect(() => {
    const fetchBetHistory = async () => {
        try {
            const response = await fetch(`/api/users/${user.id}/history`);
            if (!response.ok) {
                throw new Error('獲取投注歷史失敗');
            }
            const data = await response.json();
            setBettingHistory(data);
        } catch (error) {
            console.error('獲取投注歷史錯誤:', error);
        }
    };

    if (user) {
        fetchBetHistory();
    }
  }, [user]);

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
          <VotingResults 
            results={roundResults} 
            phase={bettingPhase} 
            correctOptionPosition={correctOptionPosition}
          />
          <button onClick={startNextPhase} className='new-round-button'>
            {bettingPhase < 3 ? `進入第 ${bettingPhase + 1} 階段` : '開始新一輪'}
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
              correctOptionPosition={correctOptionPosition}
            />
          ))}
        </div>
      )}

      <BetHistory history={bettingHistory} />
    </div>
  );
}

export default BettingScreen;