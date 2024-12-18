import axios from 'axios';

const API_URL = 'https://ejournal-0a426b220645.herokuapp.com/auth/';

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