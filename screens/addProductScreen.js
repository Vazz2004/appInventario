import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function AddProductScreen() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddProduct = async () => {
    // Validar que todos los campos estén llenos
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
      const response = await axios.post('http://192.168.10.12:5000/producto/create', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })


      const res = await axios.get('http://192.168.10.12:5000/producto/ver', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Producto agregado', 'El producto se ha agregado correctamente.');
        // Limpiar los campos después de agregar el producto
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
      />
      <TextInput
        style={styles.input}
        placeholder="Código del Producto"
        keyboardType='numeric'
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio por Unidad"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <Button title="Agregar Producto" onPress={handleAddProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
