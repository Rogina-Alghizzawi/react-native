// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// // import StockScreen from './android/app/src/screens/StockScreen';
// // import ProductDetailScreen from './android/app/src/screens/ProductDetailScreen';
// // import EditProductScreen from './android/app/src/screens/EditProductScreen';
// // import Login from './android/app/src/screens/Login';
// import StockHistoryReportScreen from './android/app/src/screens/StockHistoryReportScreen';

// export type RootStackParamList = {
//   Stock: undefined;
//   ProductDetail: { productId: number };
//   EditProduct: undefined;
//   login: undefined;
//   StockHistoryReport: undefined;
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const App = () => {
//   return (
//     <NavigationContainer>
//         <Stack.Screen name="StockHistoryReport" component={StockHistoryReportScreen} options={{ headerShown: false }} />

//       {/* <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Stock" component={StockScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="login" component={Login} options={{ headerShown: false }} /> */}

//     </NavigationContainer>
//   );
// };

// export default App;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddProductScreen from './android/app/src/screens/AddProductScreen';

// import StockHistoryReportScreen from './android/app/src/screens/StockHistoryReportScreen';
// import { createProduct } from './android/app/src/services/product';

export type RootStackParamList = {
  Stock: undefined;
  ProductDetail: { productId: number };
  EditProduct: undefined;
  login: undefined;
  StockHistoryReport: undefined;
  AddProductScreen: undefined; // Added this line
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddProductScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="AddProductScreen"
          component={AddProductScreen}
        />
        {/* You can uncomment the rest when ready */}
        {/* 
        <Stack.Screen name="Stock" component={StockScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="login" component={Login} />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
