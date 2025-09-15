import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dashboard from '../screens/Dashboard/Dashboard';
import Inventory from '../screens/Inventory/Inventory';
import Sales from '../screens/Sales/Sales';
import AIAssistant from '../screens/AI/AIAssistant';
import Profile from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = 'dashboard';
              break;
            case 'Inventory':
              iconName = 'inventory';
              break;
            case 'Sales':
              iconName = 'store';
              break;
            case 'AI':
              iconName = 'psychology';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Inventory" component={Inventory} />
      <Tab.Screen name="Sales" component={Sales} />
      <Tab.Screen name="AI" component={AIAssistant} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}