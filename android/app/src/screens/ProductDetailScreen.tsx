import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
 Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getProductById,deleteProductById  } from '../services/product';
import { getSuppliers } from '../services/supplier';
import EditSvg from '../assets/SVG/edit-svgrepo-com.svg';
import { checkRoleAccess } from '../utils/checkRoleAccess';

const fallbackImage = require('../assets/Images/logo.png');
const trashIcon = require('../assets/Images/delete.png');

const ProductDetailScreen = () => {
  const route = useRoute();
  const { productId } = route.params as { productId: number };
  const [product, setProduct] = useState<any>(null);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();
      
  const handleDelete = async () => {
    const isAllowed = await checkRoleAccess([3], navigation); 
  
    if (!isAllowed) return; 
  
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await deleteProductById(product.id);
              Alert.alert('Success', 'Product deleted successfully.');
              navigation.navigate('Stock');
            } catch (error) {
              console.error('Delete failed:', error);
              Alert.alert('Error', 'Failed to delete product.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getProductById(productId);
        setProduct(result);

        const supplierList = await getSuppliers();
        setSuppliers(supplierList);
      } catch (error) {
        console.error('Failed to fetch product or suppliers:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [productId]);

  const renderImage = (uri: string) => {
    if (!uri || uri.trim() === '') return fallbackImage;
    const secureUri = uri.startsWith('http')
      ? uri.replace('https://localhost', 'http://10.0.2.2')
      : `http://localhost:7004/${uri}`;
    return { uri: secureUri };
  };

  const getSupplierName = (id: number) => {
    const supplier = suppliers.find((s) => s.value === id);
    return supplier ? supplier.label : 'Unknown';
  };
  

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#457BFF" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>
          Product not found.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Product Details</Text>
      </View>

<ScrollView contentContainerStyle={styles.scrollContent}>
  <View style={styles.card}>
    <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('EditProduct', { productId: product.id })}>

            <EditSvg width={20} height={20} fill="#457BFF" />

          </TouchableOpacity>
          <Image
            source={renderImage(product.image)}
            style={styles.productImage}
          />

          <View style={styles.infoContainer}>
          <Text style={styles.row}>
              <Text style={styles.label}>Product Name: </Text>{product.name}
            </Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Category: </Text>{product.category.name}
            </Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Quantity: </Text>
              {product.quantity}
            </Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Supplier: </Text>
              {getSupplierName(product.supplierId)}
            </Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Measurement: </Text>
              {product.unitMeasurement}
            </Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Barcode: </Text>
              {product.barcode}
            </Text>
            <Text style={styles.row}>
              <Text style={styles.label}>Price: </Text>
              {product.price}
            </Text>
          </View>

          <TouchableOpacity
  onPress={() => handleDelete()}
>
  <Image source={trashIcon} style={styles.trashIcon} />
</TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#7BA4FF',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60, 
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    position: 'relative',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoContainer: {
    alignSelf: 'stretch',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  row: {
    fontSize: 14,
    marginVertical: 3,
  },
  label: {
    color: '#457BFF',
    fontWeight: '600',
  },
  trashIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  editIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
});

export default ProductDetailScreen;
