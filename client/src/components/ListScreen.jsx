import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import db from '../DB';

const ListScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the database and set the state
    const allUsers = db.getAllUsers();
    setUsers(Object.entries(allUsers)); // Convert object to array of [key, value] pairs
  }, [db.getAllUsers]);

  const handleRestAll = () => {
    if (confirm('確定要重置所有用戶數據嗎?')) {
      db.resetAllUsers();
      alert('所有用戶數據已重置');
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
  };

  return (
    <Container>
      <h1>管理員面板</h1>
      <div className='user-list' id='user-list'>
        {users.map(([username, data]) => (
          <div key={username} className='user-item'>
            <span className='username'>{username}</span>
            <span>籌碼: {data.chips}</span>
          </div>
        ))}
      </div>
      <Button id='close-admin-button' onClick={() => handleRestAll()} className='me-3'>
        重置所有用戶
      </Button>
      <Button id='export-data-button' onClick={() => exportData()}>
        匯出數據
      </Button>
    </Container>
  );
};

export default ListScreen;
