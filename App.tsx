import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StockScreen from './android/app/src/screens/StockScreen';
import ProductDetailScreen from './android/app/src/screens/ProductDetailScreen';
import EditProductScreen from './android/app/src/screens/EditProductScreen';
import Login from './android/app/src/screens/Login';
import StockHistoryReportScreen from './android/app/src/screens/StockHistoryReportScreen';

export type RootStackParamList = {
  Stock: undefined;
  ProductDetail: { productId: number };
  EditProduct: { productId: number };
  login: undefined;
  StockHistoryReport: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Stock" component={StockScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="StockHistoryReport" component={StockHistoryReportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

{/* // import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// // import AddProductScreen from './android/app/src/screens/AddProductScreen';
// import EditProductScreen from './android/app/src/screens/EditProductScreen';

// // import StockHistoryReportScreen from './android/app/src/screens/StockHistoryReportScreen';
// // import { createProduct } from './android/app/src/services/product';

// export type RootStackParamList = {
//   Stock: undefined;
//   ProductDetail: { productId: number };
//   EditProduct: undefined;
//   login: undefined;
//   StockHistoryReport: undefined;
//   EditProductScreen: undefined; // Added this line
// };

// const Stack = createStackNavigator<RootStackParamList>();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="EditProductScreen" screenOptions={{ headerShown: false }}>
//         <Stack.Screen
//           name="EditProductScreen"
//           component={EditProductScreen}
//         />
//         {/* You can uncomment the rest when ready */}
//         {/* 
//         <Stack.Screen name="Stock" component={StockScreen} />
//         <Stack.Screen name="EditProduct" component={EditProductScreen} />
//         <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
//         <Stack.Screen name="login" component={Login} />
//         */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App; */}
