import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/auth/';

export const registerUser = (userData) => {
  return axios.post(`${API_URL}register/`, userData);
};

export const loginUser = (userData) => {
  return axios.post(`${API_URL}login/`, userData);
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};