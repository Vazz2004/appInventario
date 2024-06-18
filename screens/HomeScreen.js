import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddProduct')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Agregar Producto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('EntryReport')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Inventarios</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ExitReport')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Informe de Salidas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('InventoryReport')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Informe de Inventario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f8f9fa', // Light background color for better contrast
    flex: 1,
    justifyContent: 'center', // Center buttons vertically
  },
  button: {
    backgroundColor: '#3498DB', // Modern blue color
    borderRadius: 8, // Rounded corners
    paddingHorizontal: 20, // Adjust horizontal padding
    paddingVertical: 15, // Adjust vertical padding
    marginVertical: 10, // Add vertical margin between buttons
    elevation: 3, // Add subtle shadow for depth (Android only)
    shadowColor: '#000', // Shadow color (Android only)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (Android only)
    shadowOpacity: 0.2, // Shadow opacity (Android only)
    shadowRadius: 2, // Shadow blur radius (Android only)
    alignItems: 'center', // Center text horizontally
  },
  buttonText: {
    fontSize: 16, // Adjust font size for readability
    color: '#fff', // White text color for contrast
    fontWeight: 'bold', // Make text bold
  },
});
