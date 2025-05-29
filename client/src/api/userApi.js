import axios from 'axios';

const API_BASE_URL = 'https://justdoit-server.onrender.com';

// 創建 axios 實例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Create a new user
export const createUser = async (name) => {
  try {
    const response = await api.post('/users', { name });
    console.log('create user response:', response.data);
    return response.data.user;
  } catch (error) {
    console.error('Error creating user:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to create user' };
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to get users' };
  }
};

// Get a user by name
export const getUserByName = async (name) => {
  try {
    const response = await api.get(`/users/name/${name}`);
    return response.data.user;
  } catch (error) {
    console.error('Error getting user:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to get user' };
  }
};

// Update chips of a user
export const updateUserChips = async (id, chips) => {
  try {
    const response = await api.put(`/users/${id}/chips`, { chips });
    return response.data;
  } catch (error) {
    console.error('Error updating chips:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to update chips' };
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to delete user' };
  }
};

// Delete all users
export const deleteAllUsers = async () => {
  try {
    const response = await api.delete('/users');
    return response.data;
  } catch (error) {
    console.error('Error deleting all users:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to delete all users' };
  }
};

// Check admin password
export const checkAdminPassword = async (password) => {
  try {
    const response = await api.post('/users/admin', { password });
    return response.data;
  } catch (error) {
    console.error('Error checking admin password:', error.response?.data || error.message);
    throw error.response?.data || { error: 'Failed to check admin password' };
  }
};
