import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (name, email, password) => {
  return await axios.post(API_URL + '/register', {
    name,
    email,
    password,
  });
};

const login = async (email, password) => {
  return await axios
    .post(API_URL + '/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        let userFinal = { ...response.data.user, token: response.data.token };
        localStorage.setItem('user', JSON.stringify(userFinal));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
