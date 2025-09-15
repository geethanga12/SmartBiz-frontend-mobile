// File: src/screens/Inventory/Inventory.js (NEW)
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
  Text,
  ActivityIndicator,
  Chip,
  Searchbar,
  FAB,
} from 'react-native-paper';
import { api } from '../../services/api';

const formatCurrency = (value) => 
  new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(value);

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/v1/item');
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filterProducts = () => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { label: 'Out of Stock', color: 'error' };
    if (quantity < 10) return { label: 'Low Stock', color: 'warning' };
    return { label: 'In Stock', color: 'success' };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading inventory...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Inventory Management</Title>
        <Searchbar
          placeholder="Search products..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.quantity);
          return (
            <Card key={product.id} style={styles.productCard}>
              <Card.Content>
                <View style={styles.productHeader}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Chip 
                    mode="outlined" 
                    style={styles.stockChip}
                    textStyle={{ color: stockStatus.color === 'error' ? 'red' : stockStatus.color === 'warning' ? 'orange' : 'green' }}
                  >
                    {stockStatus.label}
                  </Chip>
                </View>
                
                <Text style={styles.description}>{product.description}</Text>
                
                <View style={styles.productDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Price:</Text>
                    <Text style={styles.detailValue}>{formatCurrency(product.unitPrice)}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Quantity:</Text>
                    <Text style={styles.detailValue}>{product.quantity}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Total Value:</Text>
                    <Text style={styles.detailValue}>
                      {formatCurrency(product.unitPrice * product.quantity)}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          );
        })}

        {filteredProducts.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // Handle add product
          console.log('Add product pressed');
        }}
      />
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 16,
  },
  searchbar: {
    elevation: 0,
    backgroundColor: '#f0f0f0',
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
  productCard: {
    marginBottom: 12,
    elevation: 2,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  stockChip: {
    marginLeft: 8,
  },
  description: {
    color: '#666',
    marginBottom: 12,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
});