import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StockScreen from './android/app/src/screens/StockScreen';
import ProductDetailScreen from './android/app/src/screens/ProductDetailScreen';
import EditProductScreen from './android/app/src/screens/EditProductScreen';
import Login from './android/app/src/screens/Login';

export type RootStackParamList = {
  Stock: undefined;
  ProductDetail: { productId: number };
  EditProduct: undefined;
  login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Stock" component={StockScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
