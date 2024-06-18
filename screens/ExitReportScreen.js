import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function InventoryReportScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchInventoryReport();
  }, []);

  const fetchInventoryReport = async () => {
    try {
      const res = await axios.get('http://192.168.10.12:5000/producto/ver-venta', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.error('Error al obtener el informe de inventario:', error.message);
      Alert.alert('Error', 'Hubo un problema al obtener el informe de inventario.');
    }
  };

  const calculateTotalQuantity = () => {
    return products.reduce((total, product) => total + product.cantidad, 0);
  };

  const renderTechnicalDetails = (item) => {
    return (
      <View style={styles.technicalDetails}>
        <Text style={styles.detailTitle}>Detalles :</Text>
        <Text style={styles.detailText}>Nombre del Producto: {item.nombreProducto}</Text>
        <Text style={styles.detailText}>Cantidad: {item.cantidad}</Text>
        <Text style={styles.detailText}>Subtotal: {item.subtotal} USD</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>Fecha de Venta: {item.fecha_venta}</Text>
      {renderTechnicalDetails(item)}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe de ventas</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total ventas registrados: {products.length}</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  technicalDetails: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 3,
  },
});
