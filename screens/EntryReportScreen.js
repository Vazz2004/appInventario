import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import axios from 'axios';

export default function EntryReportScreen() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://192.168.10.12:5000/producto/ver', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error.message);
      Alert.alert('Error', 'Hubo un problema al obtener los productos.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.patch(`http://192.168.10.12:5000/producto/desactivar-product/${productId}`);
      fetchProducts(); // Volver a cargar los productos después de eliminar
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
      Alert.alert('Error', 'Hubo un problema al eliminar el producto.');
    }
  };

  const confirmDelete = (productId) => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => deleteProduct(productId),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const updateProduct = async () => {
    try {
      await axios.patch(`http://192.168.10.12:5000/producto/actualizar-producto/${selectedProduct.id_producto}`, selectedProduct);
      setIsModalVisible(false);
      fetchProducts(); // Volver a cargar los productos después de actualizar
    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
      Alert.alert('Error', 'Hubo un problema al actualizar el producto.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Producto: {item.nombreProducto}</Text>
      <Text style={styles.itemText}>Código: {item.codigoProduct}</Text>
      <Text style={styles.itemText}>Descripción: {item.descripcion}</Text>
      <Text style={styles.itemText}>Precio: {item.precio}</Text>
      <Text style={styles.itemText}>Cantidad: {item.cantidad}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => editProduct(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmDelete(item.id_producto)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe de Entradas</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id_producto.toString()}
        contentContainerStyle={styles.list}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Producto</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del Producto"
              value={selectedProduct?.nombreProducto}
              onChangeText={(text) => setSelectedProduct({ ...selectedProduct, nombreProducto: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Código"
              value={selectedProduct?.codigoProduct.toString()}
              onChangeText={(text) => setSelectedProduct({ ...selectedProduct, codigoProduct: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={selectedProduct?.descripcion}
              onChangeText={(text) => setSelectedProduct({ ...selectedProduct, descripcion: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio"
              value={selectedProduct?.precio.toString()} // Convertir a string si es numérico
              onChangeText={(text) => setSelectedProduct({ ...selectedProduct, precio: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              value={selectedProduct?.cantidad.toString()} // Convertir a string si es numérico
              onChangeText={(text) => setSelectedProduct({ ...selectedProduct, cantidad: text })}
              keyboardType="numeric"
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={updateProduct}
              >
                <Text style={styles.modalButtonText}>Actualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  itemText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
