// File: src/screens/Auth/Register.js (NEW)
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  TextInput,
  Button,
  Text,
  Card,
  Title,
  Paragraph,
  Snackbar,
} from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';

export default function Register({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      setSnackMessage('Please fill all fields');
      setSnackVisible(true);
      return;
    }

    setLoading(true);
    const result = await signUp(formData.name, formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      setSnackMessage('Registration successful! Please login.');
      setSnackVisible(true);
      setTimeout(() => navigation.navigate('Login'), 2000);
    } else {
      setSnackMessage(result.error || 'Registration failed');
      setSnackVisible(true);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Register</Title>
          <Paragraph style={styles.subtitle}>
            Create your SmartBiz account
          </Paragraph>

          <TextInput
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => handleChange('name', value)}
            mode="outlined"
            style={styles.input}
            disabled={loading}
          />

          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleChange('email', value)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            disabled={loading}
          />

          <TextInput
            label="Password"
            value={formData.password}
            onChangeText={(value) => handleChange('password', value)}
            mode="outlined"
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon 
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
            disabled={loading}
          />

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
            style={styles.linkButton}
          >
            Already have an account? Sign In
          </Button>
        </Card.Content>
      </Card>

      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={4000}
      >
        {snackMessage}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    elevation: 4,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6200ee',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  buttonContent: {
    height: 48,
  },
  linkButton: {
    marginTop: 8,
  },
});