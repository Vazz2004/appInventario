import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const imgFondo = { uri: 'https://w0.peakpx.com/wallpaper/952/243/HD-wallpaper-iphone-ios-13-fondo-de-pantalla-ios-13.jpg' };

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground source={imgFondo} resizeMode="cover" style={styles.image}>
      <View style={styles.overlay}>
        <Text style={styles.titulo}>Bienvenido</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddProduct')} style={styles.button}>
          <AntDesign name="inbox" size={24} color="white" />
          <Text style={styles.buttonText}>Agregar Producto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EntryReport')} style={styles.button}>
          <FontAwesome name="th-list" size={24} color="white" />
          <Text style={styles.buttonText}>Inventarios</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ExitReport')} style={styles.button}>
          <MaterialCommunityIcons name="newspaper-minus" size={24} color="white" />
          <Text style={styles.buttonText}>Informe de Salidas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('InventoryReport')} style={styles.button}>
          <MaterialCommunityIcons name="newspaper-check" size={24} color="white" />
          <Text style={styles.buttonText}>Informe de Inventario</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#023047',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
