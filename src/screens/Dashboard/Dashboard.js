// File: src/screens/Dashboard/Dashboard.js (NEW)
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Text,
  ActivityIndicator,
  Chip,
  Button,
} from 'react-native-paper';
import { api } from '../../services/api';

const formatCurrency = (value) => 
  new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(value);

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/api/v1/dashboard/overview');
      setOverview(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.content}>
        <Title style={styles.welcomeTitle}>Business Overview</Title>
        <Paragraph style={styles.subtitle}>
          Today's performance at a glance
        </Paragraph>

        {/* Metrics Cards */}
        <View style={styles.metricsContainer}>
          <Card style={[styles.metricCard, styles.salesCard]}>
            <Card.Content style={styles.metricContent}>
              <Text style={styles.metricLabel}>Sales</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(overview?.sales || 0)}
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.metricCard, styles.inventoryCard]}>
            <Card.Content style={styles.metricContent}>
              <Text style={styles.metricLabel}>Inventory</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(overview?.inventoryValue || 0)}
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.metricCard, styles.profitCard]}>
            <Card.Content style={styles.metricContent}>
              <Text style={styles.metricLabel}>Profits</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(overview?.profits || 0)}
              </Text>
            </Card.Content>
          </Card>

          <Card style={[styles.metricCard, styles.expenseCard]}>
            <Card.Content style={styles.metricContent}>
              <Text style={styles.metricLabel}>Expenses</Text>
              <Text style={styles.metricValue}>
                {formatCurrency(overview?.expenses || 0)}
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Card.Content>
            <Title>Quick Actions</Title>
            <View style={styles.chipContainer}>
              <Chip icon="plus" mode="outlined" style={styles.actionChip}>
                Add Product
              </Chip>
              <Chip icon="cart" mode="outlined" style={styles.actionChip}>
                New Sale
              </Chip>
              <Chip icon="psychology" mode="outlined" style={styles.actionChip}>
                Ask AI
              </Chip>
            </View>
          </Card.Content>
        </Card>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    marginBottom: 20,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    width: '48%',
    marginBottom: 12,
    elevation: 2,
  },
  salesCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  inventoryCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  profitCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  expenseCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  metricContent: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  actionsCard: {
    elevation: 2,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  actionChip: {
    marginRight: 8,
    marginBottom: 8,
  },
});
