// src/App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/utils/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <StatusBar barStyle="dark-content" backgroundColor="#6200ee" />
          <AppNavigator />
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}


// import {
//   StatusBar,
//   StyleSheet,
//   useColorScheme,
//   SafeAreaView,
//   Platform,
// } from 'react-native';
// import Login from './src/screens/Login/Login';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <Login />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
//     backgroundColor: '#fff',
//   },
// });

// export default App;
