import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function SalesReportScreen() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSalesReport();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0, // Opcional: ajusta según tus necesidades
    }).format(amount);
  };

  const fetchSalesReport = async () => {
    try {
      const res = await axios.get('http://192.168.10.12:5000/producto/ver-venta', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Formatear la fecha de venta antes de almacenarla en el estado
      const formattedSales = res.data.map(sale => ({
        ...sale,
        fecha_venta: new Date(sale.fecha_venta).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      }));
      setSales(formattedSales);
    } catch (error) {
      console.error('Error al obtener el informe de ventas:', error.message);
      Alert.alert('Error', 'Hubo un problema al obtener el informe de ventas.');
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
      background-color: #4caf50;
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
              color: #4caf50;
            }
            .technicalDetails {
              background-color: #f0f0f0;
              padding: 10px;
              border-radius: 5px;
            }
            .detailTitle {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 5px;
              color: #4caf50;
            }
            .detailText {
              font-size: 14px;
              margin-bottom: 3px;
            }
          </style>
        </head>
        <body>
          <h1>Informe de Ventas</h1>
          <p>Total ventas registradas: ${sales.length}</p>
          <ul>
            ${sales.map(sale => `
              <li>
                <div class="itemTitle">Fecha de Venta: ${sale.fecha_venta}</div>
                <div class="technicalDetails">
                  <p><strong>Nombre del Producto:</strong> ${sale.nombreProducto}</p>
                  <p><strong>Cantidad:</strong> ${sale.cantidad}</p>
                  <p><strong>Subtotal:</strong> ${sale.subtotal} USD</p>
                </div>
              </li>
            `).join('')}
          </ul>
        </body>
      </html>
    `;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe de Ventas</Text>
      <FlatList
        data={sales}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Fecha de Venta: {item.fecha_venta}</Text>
            <View style={styles.technicalDetails}>
              <Text style={styles.detailText}>Nombre del Producto: {item.nombreProducto}</Text>
              <Text style={styles.detailText}>Cantidad: {item.cantidad}</Text>
              <Text style={styles.detailText}>Subtotal: { formatCurrency( item.subtotal)} COP</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
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
    color: '#4caf50',
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
    color: '#4caf50',
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
    color: '#4caf50',
  },
  detailText: {
    fontSize: 14,
    marginBottom: 3,
  },
});
