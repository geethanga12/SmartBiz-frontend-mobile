// src/App.js
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Platform,
} from 'react-native';
import Login from './src/screens/Login/Login';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Login />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },
});

export default App;
