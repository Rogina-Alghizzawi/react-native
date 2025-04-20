import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { getStockLevels } from '../services/product'; // Adjust the import path as necessary
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getSuppliers } from '../services/supplier'; 
const fallbackImage = require('../assets/Images/logo.png'); // fallback image for products without one

const StockScreen = () => {
  const [data, setData] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const navigation: any = useNavigation();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  
  //     const [stockResponse, supplierResponse] = await Promise.all([
  //       getStockLevels(),
  //       getSuppliers()
  //     ]);
  
  //     setData(stockResponse);
  //     setSuppliers(supplierResponse);
  
  //     if (stockResponse.length > 0) {
  //       setActiveCategory(stockResponse[0].category);
  //       setProducts(stockResponse[0].products);
  //     }
  
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);
  



  const fetchData = async () => {
    setLoading(true);
  
    const [stockResponse, supplierResponse] = await Promise.all([
      getStockLevels(),
      getSuppliers()
    ]);
  
    setData(stockResponse);
    setSuppliers(supplierResponse);
  
    if (stockResponse.length > 0) {
      setActiveCategory(stockResponse[0].category);
      setProducts(stockResponse[0].products);
    }
  
    setLoading(false);
  };
  

  const isFocused = useIsFocused();

useEffect(() => {
  if (isFocused) {
    fetchData(); // 👈 يعيد تحميل البيانات كل مرة ترجع فيها الشاشة للفوكس
  }
}, [isFocused]);

  useEffect(() => {
    if (data.length === 0) return;
    const selected = data.find((cat) => cat.category === activeCategory);
    if (selected) {
      setProducts(selected.products);
    }
  }, [activeCategory, data]);
  
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderImage = (uri: string) => {
    if (!uri || uri.trim() === '') return fallbackImage;
    const secureUri = uri.startsWith('http') ? uri.replace('https://localhost', 'http://10.0.2.2') : `http://localhost:7004/${uri}`;
    return { uri: secureUri };
  };


return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Available Stock</Text>
      </View> */}
  
      {/* Tabs */}
      <View >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {data.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, activeCategory === cat.category && styles.activeTab]}
              onPress={() => setActiveCategory(cat.category)}
            >
              <Text style={[styles.tabText, activeCategory === cat.category && styles.activeTabText]}>
                {cat.category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
  
      {/* Main Content */}
      <View >
        {/* Search */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />


          
        </View>
      

        {/* Product List */}
        {loading ? (
          <ActivityIndicator size="large" color="#457BFF" style={{ marginTop: 20 }} />
        ) : filteredProducts.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No Products Found</Text>
        ) : (
          <ScrollView >
         
              {filteredProducts.map((product, index) => (
    <TouchableOpacity
      key={index}
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { productId: product.productId })}
      >
      <Image source={renderImage(product.image)} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Quantity: </Text>{product.quantity}</Text>
  
       <Text style={styles.label}>
  <Text style={styles.bold}>Supplier: </Text>
  {
    suppliers.find((s) => s.value === product.supplierId)?.label || 'Unknown'
  }
</Text>

        <Text style={styles.label}><Text style={styles.bold}>Measurement: </Text>{product.measurement}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  ))}
          </ScrollView>
        )}
      </View>
  
      {/* Floating Button */}
      <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddProductScreen')}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
    </View>
  );
}  
export default StockScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1F6FF',
    },
    header: {
      backgroundColor: '#7BA4FF',
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 30,
      borderBottomLeftRadius: 60,
      borderBottomRightRadius: 60, // Optional for symmetry
    },
    headerText: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },
    tabScroll: {
        marginTop: 30,
        marginBottom: 30,
        paddingHorizontal: 15,
        flexDirection: 'row',
      },
      tab: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 30,
        marginRight: 12,
        minWidth: 150,
        maxHeight:45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EAF1FF', 
      },
      activeTab: {
        backgroundColor: '#457BFF',
      },
      tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#457BFF',
      },
      activeTabText: {
        color: '#FFFFFF',
      },
    searchBox: {
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    searchInput: {
      backgroundColor: 'white',
      borderRadius: 12,
      paddingHorizontal: 15,
      height: 45,
      borderWidth: 1,
      borderColor: '#ddd',
    },
    card: {
      backgroundColor: 'white',
      marginHorizontal: 15,
      marginVertical: 8,
      borderRadius: 20,
      flexDirection: 'row',
      padding: 15,
      shadowColor: '#000',
      shadowOpacity: 0.07,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 4,
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
      resizeMode: 'cover',
      marginRight: 12,
      borderRadius: 10,
      backgroundColor: '#f0f0f0',
    },
    info: {
      flex: 1,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 4,
      color: '#333',
      textTransform: 'capitalize', // Normalize casing
    },
    label: {
      fontSize: 12,
      color: '#444',
      lineHeight: 18,
    },
    bold: {
      fontWeight: 'bold',
      color: '#457BFF',
    },
    arrow: {
      fontSize: 22,
      color: '#457BFF',
      marginLeft: 10,
    },
    // fab: {
    //   alignSelf: 'center',
    //   backgroundColor: '#457BFF',
    //   width: 60,
    //   height: 60,
    //   borderRadius: 30,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   elevation: 6,
    //   shadowColor: '#000',
    //   shadowOffset: { width: 0, height: 3 },
    //   shadowOpacity: 0.2,
    //   shadowRadius: 5,
    // },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#457BFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      
    fabText: {
      fontSize: 32,
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  