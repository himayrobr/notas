const API_BASE_URL = 'http://localhost:5000/api';

export const endpoints = {
  register: `${API_BASE_URL}/users/register`,
  login: `${API_BASE_URL}/users/login`,
  logout: `${API_BASE_URL}/users/logout`,
  notes: `${API_BASE_URL}/notes`,
 
};

export default API_BASE_URL;
