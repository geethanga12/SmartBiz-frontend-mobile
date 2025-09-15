// File: src/navigation/AppNavigator.js (NEW)
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import LoadingSpinner from '../components/LoadingSpinner';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isLoading, userToken } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Initializing app..." />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Main" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
}