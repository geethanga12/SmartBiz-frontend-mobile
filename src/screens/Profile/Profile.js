// File: src/screens/Profile/Profile.js (NEW)
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Card,
  Title,
  Text,
  Button,
  List,
  Divider,
  Avatar,
} from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { userEmail, userRole, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Profile Header */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Text 
              size={80} 
              label={userEmail ? userEmail[0].toUpperCase() : 'U'} 
              style={styles.avatar}
            />
            <Title style={styles.profileTitle}>
              {userEmail || 'User'}
            </Title>
            <Text style={styles.profileRole}>{userRole || 'OWNER'}</Text>
          </Card.Content>
        </Card>

        {/* Menu Items */}
        <Card style={styles.menuCard}>
          <Card.Content>
            <List.Section>
              <List.Item
                title="Business Information"
                left={props => <List.Icon {...props} icon="business" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => console.log('Business info pressed')}
              />
              <Divider />
              <List.Item
                title="Settings"
                left={props => <List.Icon {...props} icon="cog" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => console.log('Settings pressed')}
              />
              <Divider />
              <List.Item
                title="Help & Support"
                left={props => <List.Icon {...props} icon="help-circle" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => console.log('Help pressed')}
              />
              <Divider />
              <List.Item
                title="About"
                left={props => <List.Icon {...props} icon="information" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => console.log('About pressed')}
              />
            </List.Section>
          </Card.Content>
        </Card>

        {/* App Info */}
        <Card style={styles.infoCard}>
          <Card.Content>
            <Title>SmartBiz Mobile</Title>
            <Text style={styles.versionText}>Version 1.0.0</Text>
            <Text style={styles.infoText}>
              AI-Powered Business Management Suite for SMEs
            </Text>
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          buttonColor="#f44336"
          icon="logout"
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  profileCard: {
    marginBottom: 16,
    elevation: 2,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    backgroundColor: '#6200ee',
    marginBottom: 16,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  menuCard: {
    marginBottom: 16,
    elevation: 2,
  },
  infoCard: {
    marginBottom: 24,
    elevation: 2,
  },
  versionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  logoutButton: {
    marginBottom: 32,
  },
});