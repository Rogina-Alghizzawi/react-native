import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StockScreen from './android/app/src/screens/StockScreen';
import ProductDetailScreen from './android/app/src/screens/ProductDetailScreen';

export type RootStackParamList = {
  Stock: undefined;
  ProductDetail: { productId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Stock">
        <Stack.Screen name="Stock" component={StockScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
