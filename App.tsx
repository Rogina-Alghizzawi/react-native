import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReorderHistoryScreen from './android/app/src/screens/ReorderHistoryScreen';
import InventoryAnalyticsScreen from './android/app/src/screens/InventoryAnalyticsScreen';
import StaffRegister from './android/app/src/screens/StaffRegister';

import StockScreen from './android/app/src/screens/StockScreen';
import ProductDetailScreen from './android/app/src/screens/ProductDetailScreen';
import EditProductScreen from './android/app/src/screens/EditProductScreen';
import Login from './android/app/src/screens/Login';
import StockHistoryReportScreen from './android/app/src/screens/StockHistoryReportScreen';
import AddProductScreen from './android/app/src/screens/AddProductScreen';
// import RoleBasedHomeScreen from './android/app/src/screens/RoleBasedHomeScreen';

export type RootStackParamList = {
  Stock: undefined;
  ProductDetail: { productId: number };
  EditProduct: { productId: number };
  login: undefined;
  StockHistoryReport: undefined;
  AddProductScreen:undefined;
  StockHistoryReportScreen:undefined;
  ReorderHistoryScreen:undefined;
  StaffRegister:undefined;
  InventoryAnalyticsScreen:undefined;
  RoleBasedHomeScreen: { roleId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
     

     <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}> 
     <Stack.Screen name="login" component={Login} />

        <Stack.Screen name="Stock" component={StockScreen} 
       />
        <Stack.Screen name="EditProduct" component={EditProductScreen} 
        
        
        />
           {/* <Stack.Screen
           name="RoleBasedHomeScreen"
          component={RoleBasedHomeScreen}
         /> */}
     <Stack.Screen
           name="InventoryAnalyticsScreen"
          component={InventoryAnalyticsScreen}
         />
<Stack.Screen name="StaffRegister" component={StaffRegister} />

        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} 
         />
        <Stack.Screen name="StockHistoryReport" component={StockHistoryReportScreen} 
          />

        <Stack.Screen name="AddProductScreen" component={AddProductScreen} 
          /> 
           <Stack.Screen
           name="StockHistoryReportScreen"
          component={StockHistoryReportScreen}
         />
           <Stack.Screen
           name="ReorderHistoryScreen"
          component={ReorderHistoryScreen} //the logic here???
         /> 
         
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
