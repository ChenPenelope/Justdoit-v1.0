import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import db from '../DB';
import { getUserByName, updateUserChips } from '../api/userApi';
import BetHistory from './BetHistory';
import BettingOption from './BettingOption';
import './BettingScreen.css';

BettingScreen.propTypes = {
  currentUser: PropTypes.string.isRequired,
};

function BettingScreen({ currentUser }) {
  const [chipCount, setChipCount] = useState(1000);
  const [history, setHistory] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [user, setUser] = useState(null);
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

  const handleBet = (option, multiplier, index) => {
    const amount = parseInt(inputValues[index]);
    if (isNaN(amount) || amount <= 0) {
      alert('請輸入有效的投注籌碼');
      return;
    }

    if (!user || user.chips < amount) {
      alert('籌碼不足!');
      return;
    }

    var newChips = chipCount - amount;
    setChipCount(newChips);
    updateUserChips(user.id, newChips);

    // Update history
    db.addBetHistory(currentUser, option, amount, multiplier, isWin);
    const newHistory = [...history, { currentUser, option, amount, multiplier, isWin }];
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

  const bettingOptions = ['A', 'B', 'C', 'D'];

  return (
    <div id='betting-screen' className='container'>
      <div className='header'>
        <div className='user-info'>
          <div className='username' id='display-username'>
            {currentUser}
          </div>
          <div className='chip-counter'>
            籌碼: <span id='chip-count'>{chipCount}</span>
          </div>
        </div>
        <div id='game-status'>遊戲進行中...</div>
      </div>

      {/* bettingOptions */}
      <div className='betting-options'>
        {bettingOptions.map((option, index) => (
          <BettingOption
            key={index}
            index={index}
            option={option}
            inputValues={inputValues}
            handleInputChange={handleInputChange}
            handleBet={handleBet}
          />
        ))}
      </div>

      {/* bet history */}
      <BetHistory history={history} />
    </div>
  );
}

export default BettingScreen;
