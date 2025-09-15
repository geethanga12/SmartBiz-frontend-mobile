// File: src/screens/Sales/Sales.js (NEW)
import React, { useState, useEffect } from 'react';
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
  TextInput,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';
import { api } from '../../services/api';

const formatCurrency = (value) => 
  new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(value);

export default function Sales() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/api/v1/order');
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading sales...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Sales Management</Title>
        <Button
          mode="contained"
          icon="plus"
          onPress={() => setShowCreateForm(true)}
          style={styles.addButton}
        >
          New Sale
        </Button>
      </View>

      <ScrollView style={styles.scrollView}>
        {orders.map((order) => (
          <Card key={order.id} style={styles.orderCard}>
            <Card.Content>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{order.id}</Text>
                <Text style={styles.orderAmount}>{formatCurrency(order.amount)}</Text>
              </View>
              
              <Text style={styles.orderDate}>
                {new Date(order.date).toLocaleDateString('en-LK')}
              </Text>
              
              <Text style={styles.orderStatus}>Status: {order.status}</Text>
              
              {order.details && (
                <View style={styles.orderDetails}>
                  <Text style={styles.detailsTitle}>Items:</Text>
                  {order.details.map((detail, index) => (
                    <Text key={index} style={styles.detailItem}>
                      • Item {detail.itemId} x {detail.quantity}
                    </Text>
                  ))}
                </View>
              )}
            </Card.Content>
          </Card>
        ))}

        {orders.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No sales found</Text>
            <Text style={styles.emptySubtext}>Create your first sale to get started</Text>
          </View>
        )}
      </ScrollView>

      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={3000}
      >
        {snackMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  addButton: {
    backgroundColor: '#6200ee',
  },
  scrollView: {
    flex: 1,
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
  orderCard: {
    marginBottom: 12,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  orderDate: {
    color: '#666',
    marginBottom: 4,
  },
  orderStatus: {
    color: '#666',
    marginBottom: 8,
  },
  orderDetails: {
    marginTop: 8,
  },
  detailsTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailItem: {
    color: '#666',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});