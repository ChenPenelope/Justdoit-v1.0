import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { deleteAllUsers, deleteUser, getAllUsers } from '../api/userApi';

const ListScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers); // Assuming getAllUsers returns an array
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRestAll = () => {
    if (confirm('確定要重置所有用戶數據嗎?')) {
      deleteAllUsers();
      alert('所有用戶數據已重置');
      setUsers([]);
    }
  };

  const exportData = () => {
    const data = JSON.stringify(users, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'betting_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('確定要刪除此用戶嗎?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleEditUser = (id) => {
    // Implement edit user functionality
    console.log(`Edit user with id: ${id}`);
  };

  return (
    <Container style={{ height: '80%' }}>
      <h1 className='mb-3 mt-3 purple-header-text'>管理員面板</h1>
      <Table bordered className='my-4 text-white'>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Username</th>
            <th>Chips</th>
            <th>Created At</th>
            <th style={{ width: '60px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.chips}</td>
              <td>{new Date(user.created_at).toLocaleString()}</td>
              <td style={{ textAlign: 'center' }}>
                <FaEdit
                  onClick={() => handleEditUser(user.id)}
                  className='text-primary'
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                />
                <FaTrash
                  onClick={() => handleDeleteUser(user.id)}
                  style={{ cursor: 'pointer' }}
                  className='text-danger'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        id='close-admin-button'
        onClick={() => handleRestAll()}
        className='me-5 btn btn-danger'
      >
        重置所有用戶
      </Button>
      <Button id='export-data-button' onClick={() => exportData()}>
        匯出數據
      </Button>
    </Container>
  );
};

export default ListScreen;
