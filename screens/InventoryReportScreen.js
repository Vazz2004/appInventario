import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function InventoryReportScreen() {
  const [products, setProducts] = useState([]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0, // Opcional: ajusta según tus necesidades
    }).format(amount);
  };

  useEffect(() => {
    fetchInventoryReport();
  }, []);

  const fetchInventoryReport = async () => {
    try {
      const res = await axios.get('https://back-end-app-inventory.vercel.app/producto/ver', {
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

  const generatePDF = async () => {
    const htmlContent = generateHTML(); // Generar el contenido HTML para el PDF

    try {
      const file = await printToFileAsync({
        html: htmlContent,
        base64: false,
      });
      await shareAsync(file.uri);
    } catch (error) {
      console.error('Error al generar o compartir el PDF:', error.message);
      Alert.alert('Error', 'Hubo un problema al generar o compartir el PDF.');
    }
  };

  const generateHTML = () => {
    const headerStyle = `
      background-color: #1e88e5;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    `;

    const listItemStyle = `
      padding: 10px;
      border-bottom: 1px solid #ddd;
    `;

    return `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 20px;
            }
            h1 {
              ${headerStyle}
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              ${listItemStyle}
            }
            .itemTitle {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 5px;
              color: #1e88e5;
            }
            .technicalDetails {
              background-color: #f0f0f0;
              padding: 10px;
              border-radius: 5px;
            }
            .detailText {
              font-size: 14px;
              margin-bottom: 3px;
            }
          </style>
        </head>
        <body>
          <h1>Informe Técnico de Inventario</h1>
          <p>Total de productos registrados: ${products.length}</p>
          <p>Total de unidades en inventario: ${calculateTotalQuantity()}</p>
          <ul>
            ${products.map(product => `
              <li>
                <div class="itemTitle">${product.nombreProducto}</div>
                <div class="technicalDetails">
                  <p><strong>Código:</strong> ${product.codigoProducto}</p>
                <p><strong>Precio Unitario:</strong> ${formatCurrency(product.precio)} COP</p>
                  <p><strong>Cantidad en Stock:</strong> ${product.cantidad}</p>
                  <p><strong>Descripción:</strong> ${product.descripcion}</p>
                </div>
              </li>
            `).join('')}
          </ul>
        </body>
      </html>
    `;
  };

  const calculateTotalQuantity = () => {
    if (products.length === 0) return 0;
    return products.reduce((total, product) => total + product.cantidad, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe Técnico de Inventario</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.nombreProducto}</Text>
            <View style={styles.technicalDetails}>
              <Text style={styles.detailText}>Código: {item.codigoProducto}</Text>
        <Text style={styles.detailText}>Precio Unitario: {formatCurrency(item.precio)} </Text>
              <Text style={styles.detailText}>Cantidad en Stock: {item.cantidad}</Text>
              <Text style={styles.detailText}>Descripción: {item.descripcion}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id_producto.toString()}
        contentContainerStyle={styles.list}
      />
      <Button title="Generar PDF" onPress={generatePDF} />
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
    color: '#1e88e5',
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
    color: '#1e88e5',
  },
  technicalDetails: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 3,
  },
});
