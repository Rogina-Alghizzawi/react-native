import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getProductById } from '../services/product';
import { useRoute } from '@react-navigation/native';

const ProductDetailScreen = () => {
  const route = useRoute();
  const { productId } = route.params as { productId: number };

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const result = await getProductById(productId);
        setProduct(result);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#457BFF" />;
  }

  if (!product) {
    return <Text style={{ textAlign: 'center', marginTop: 50 }}>Product not found.</Text>;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Quantity: {product.quantity}</Text>
      <Text>Supplier ID: {product.supplierId}</Text>
      <Text>Measurement: {product.measurement}</Text>
    </View>
  );
};

export default ProductDetailScreen;
