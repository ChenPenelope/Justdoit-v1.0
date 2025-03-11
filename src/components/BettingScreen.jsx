import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './BettingScreen.css';
import db from '../DB';
import BetHistory from './BetHistory';
import BettingOption from './BettingOption';

BettingScreen.propTypes = {
  currentUser: PropTypes.string.isRequired,
};

function BettingScreen({ currentUser }) {
  const [chipCount, setChipCount] = useState(1000);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the database and set the state
    const allUsers = db.getAllUsers();
    setUsers(Object.entries(allUsers)); // Convert object to array of [key, value] pairs
    setChipCount(allUsers[currentUser]?.chips || 1000);
  }, [db.getAllUsers]);

  const handleBet = (option, multiplier, index) => {
    const amount = parseInt(inputValues[index]);
    if (isNaN(amount) || amount <= 0) {
      alert('請輸入有效的投注籌碼');
      return;
    }

    const user = db.users[currentUser];
    if (!user || user.chips < amount) {
      alert('籌碼不足!');
      return;
    }

    db.updateChips(currentUser, -amount);
    setChipCount((prevChipCount) => prevChipCount - amount);

    // Determine win or lose (50% chance)
    const isWin = Math.random() >= 0.5;
    if (isWin) {
      const winAmount = Math.floor(amount * multiplier);
      db.updateChips(currentUser, winAmount);
      setChipCount((prevChipCount) => prevChipCount + winAmount);
    }

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

  const handleRestAll = () => {
    if (confirm('確定要重置所有用戶數據嗎?')) {
      db.resetAllUsers();
      // updateUserList();
      alert('所有用戶數據已重置');
      setShowModal(false);
    }
  };

  const exportData = () => {
    const data = JSON.stringify(db.getAllUsers(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'betting_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setShowModal(false);
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

        {/* admin control button */}
        <div id='admin-control' onClick={() => setShowModal(true)}>
          管理員
        </div>
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>管理員面板</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='user-list' id='user-list'>
            {users.map(([username, data]) => (
              <div key={username} className='user-item'>
                <span className='username'>{username}</span>
                <span>籌碼: {data.chips}</span>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className='admin-controls'>
          <Button id='close-admin-button' onClick={() => handleRestAll()}>
            重置所有用戶
          </Button>
          <Button id='export-data-button' onClick={() => exportData()}>
            匯出數據
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BettingScreen;
