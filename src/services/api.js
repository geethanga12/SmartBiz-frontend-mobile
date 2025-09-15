// File: src/services/api.js (NEW)
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use appropriate base URL for your setup:
// Android Emulator: http://10.0.2.2:8080
// iOS Simulator: http://localhost:8080  
// Physical Device: http://YOUR_COMPUTER_IP:8080
const BASE_URL = 'http://10.0.2.2:8080'; // Change this as needed

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, clear storage
      await AsyncStorage.multiRemove(['userToken', 'userEmail', 'userRole']);
    }
    return Promise.reject(error);
  }
);

export { api };