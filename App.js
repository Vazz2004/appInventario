import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/addProductScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import EntryReportScreen from './screens/EntryReportScreen';
import ExitReportScreen from './screens/ExitReportScreen';
import InventoryReportScreen from './screens/InventoryReportScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="EntryReport" component={EntryReportScreen} />
        <Stack.Screen name="ExitReport" component={ExitReportScreen} />
        <Stack.Screen name="InventoryReport" component={InventoryReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
