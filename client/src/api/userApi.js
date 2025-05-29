import axios from 'axios';

const API_BASE_URL = 'https://justdoit-server.onrender.com';

// Create a new user
export const createUser = async (name) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, { name });
    console.log('create user', response.data.user);
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.log(error.response);
    throw error.response;
  }
};

// Get a user by name
export const getUserByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/name/${name}`);
    return response.data.user;
  } catch (error) {
    throw error.response.data;
  }
};

// Update chips of a user
export const updateUserChips = async (id, chips) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${id}/chips`, { chips });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete all users
export const deleteAllUsers = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Check admin password
export const checkAdminPassword = async (password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/admin`, { password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
