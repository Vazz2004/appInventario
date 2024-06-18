import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExitReportScreen() {
  // Lógica para obtener y mostrar el informe de salidas
  return (
    <View style={styles.container}>
      <Text>Informe de Salidas</Text>
      {/* Mostrar detalles del informe */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
