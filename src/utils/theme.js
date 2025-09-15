// File: src/utils/theme.js (NEW)
import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#f5f5f5',
    surface: '#ffffff',
    error: '#b00020',
  },
};