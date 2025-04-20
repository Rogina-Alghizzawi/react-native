// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const RoleBasedHomeScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { roleId } = route.params; // from login screen

//   // Placeholder image (replace with actual images)
//   const defaultImage = require('../assets/Images/logo.png');

//   const allScreens = {
//     2: [ // Manager
//       { title: 'Stock', route: 'Stock', image: defaultImage },
//       { title: 'Inventory Analytics', route: 'InventoryAnalyticsScreen', image: defaultImage },
//       { title: 'Reorder History', route: 'ReorderHistoryScreen', image: defaultImage },
//       { title: 'Stock History', route: 'StockHistoryReportScreen', image: defaultImage },


//     ],
//     3: [ // Staff
//       { title: 'Stock', route: 'Stock', image: defaultImage },
//       { title: 'Edit Product', route: 'EditProduct', image: defaultImage },
//       { title: 'Add Product', route: 'AddProductScreen', image: defaultImage },
//     ]
//   };

//   const screensToShow = allScreens[roleId] || [];

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate(item.route)}
//     >
//       <Image source={item.image || defaultImage} style={styles.image} resizeMode="contain" />
//       <Text style={styles.label}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>📁 Dashboard</Text>
//       <FlatList
//         data={screensToShow}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.route}
//         numColumns={2}
//         contentContainerStyle={styles.grid}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 30,
//     paddingHorizontal: 16,
//     backgroundColor: '#f8fafc'
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#334155'
//   },
//   grid: {
//     justifyContent: 'center'
//   },
//   card: {
//     width: '45%',
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 15,
//     margin: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 3
//   },
//   image: {
//     width: 60,
//     height: 60,
//     marginBottom: 10
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1f2937',
//     textAlign: 'center'
//   }
// });

// export default RoleBasedHomeScreen;
