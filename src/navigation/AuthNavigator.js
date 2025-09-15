// File: src/navigation/AuthNavigator.js (NEW)
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}