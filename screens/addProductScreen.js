import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function AddProductScreen() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddProduct = async () => {
    if (!name || !code || !description || !price || !quantity) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const productData = {
      nombreProducto: name,
      codigoProduct: code,
      descripcion: description,
      precio: parseFloat(price),
      cantidad: parseInt(quantity),
    };

    try {
      const response = await axios.post('https://back-end-app-inventory.vercel.app/producto/create', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Producto agregado', 'El producto se ha agregado correctamente.');
        setName('');
        setCode('');
        setDescription('');
        setPrice('');
        setQuantity('');
      } else {
        Alert.alert('Error', 'Hubo un problema al agregar el producto.');
      }
    } catch (error) {
      console.error('Error al agregar el producto:', error.message);
      Alert.alert('Error', 'Hubo un problema al agregar el producto.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Producto"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Código del Producto"
        keyboardType='numeric'
        value={code}
        onChangeText={setCode}
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Precio por Unidad"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Agregar Producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1d3557',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#f1faee',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#023047',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
