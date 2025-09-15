// File: src/context/AuthContext.js (NEW)
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        userEmail: action.email,
        userRole: action.role,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignedIn: true,
        userToken: action.token,
        userEmail: action.email,
        userRole: action.role,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignedIn: false,
        userToken: null,
        userEmail: null,
        userRole: null,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.loading,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignedIn: false,
    userToken: null,
    userEmail: null,
    userRole: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken, userEmail, userRole;
      
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userEmail = await AsyncStorage.getItem('userEmail');
        userRole = await AsyncStorage.getItem('userRole');
      } catch (e) {
        console.log('Restoring token failed:', e);
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken, email: userEmail, role: userRole });
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (email, password) => {
      dispatch({ type: 'SET_LOADING', loading: true });
      
      try {
        const response = await authService.login(email, password);
        const { token, email: userEmail, role } = response;
        
        await AsyncStorage.multiSet([
          ['userToken', token],
          ['userEmail', userEmail],
          ['userRole', role],
        ]);
        
        dispatch({ type: 'SIGN_IN', token, email: userEmail, role });
        return { success: true };
      } catch (error) {
        dispatch({ type: 'SET_LOADING', loading: false });
        return { success: false, error: error.response?.data || error.message };
      }
    },
    
    signOut: async () => {
      await AsyncStorage.multiRemove(['userToken', 'userEmail', 'userRole']);
      dispatch({ type: 'SIGN_OUT' });
    },
    
    signUp: async (name, email, password) => {
      try {
        await authService.register(name, email, password);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.response?.data || error.message };
      }
    },
    
    ...state,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};