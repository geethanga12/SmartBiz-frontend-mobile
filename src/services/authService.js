// File: src/services/authService.js (NEW)
import { api } from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { 
      name, 
      email, 
      password, 
      role: 'OWNER' 
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/profile');
    return response.data;
  },
};