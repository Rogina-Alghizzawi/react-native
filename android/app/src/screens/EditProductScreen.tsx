import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { getProductById, updateProductById } from '../services/product';
import { getProductStatuses } from '../services/productStatusService';
import { getCategories } from '../services/categoryService';

import { checkRoleAccess } from '../utils/checkRoleAccess';


const EditProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [unitMeasurement, setUnitMeasurement] = useState('');
  const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('1');
  const [categories, setCategories] = useState<{ value: number; label: string }[]>([]);
  const [status, setStatus] = useState('1');
  const [statuses, setStatuses] = useState<{ value: number; label: string }[]>([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<any>();
  const route = useRoute();
  const { productId } = route.params as { productId: string };

  useEffect(() => {
    checkRoleAccess([3], navigation); 
  }, [navigation]);
  


  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(parseInt(productId));
        setProductName(data.name);
        setUnitMeasurement(data.unitMeasurement);
        setBarcode(data.barcode);
        setPrice(data.price.toString());
        setQuantity(data.quantity.toString());
        setCategoryId(data.categoryId?.toString() || '1');
        setStatus(data.status?.toString() || '1');
        setDescription(data.description || '');
        setImage({ uri: data.imagePath });
      } catch (error) {
        console.error('Failed to load product:', error);
        Alert.alert('Error', 'Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchStatuses = async () => {
      try {
        const data = await getProductStatuses();
        setStatuses(data);
      } catch (error) {
        console.error('Failed to load statuses:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    fetchStatuses();
    fetchCategories();
    fetchProduct();
  }, [productId]);

  const handleChooseImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result?.assets && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      let imagePath = image?.uri;

      if (image && image.uri && !image.uri.startsWith('http')) {
        imagePath = image.uri;
      }

      await updateProductById(parseInt(productId), {
        name: productName,
        unitMeasurement,
        barcode,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
        status: parseInt(status),
        description,
        imagePath,
      });

      Alert.alert('Success', 'Product updated successfully.');
      navigation.navigate('Stock');

    } catch (error) {
      console.error('Update failed:', error);
      Alert.alert('Error', 'Failed to update product.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#457BFF" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
        </View>
      <View style={styles.card}>
      <Text style={styles.label}>Product Name:</Text>
      <TextInput style={styles.input} value={productName} onChangeText={setProductName} />

      <Text style={styles.label}>Unit Measurement:</Text>
      <Picker selectedValue={unitMeasurement} onValueChange={setUnitMeasurement} style={styles.picker}>
        <Picker.Item label="Select Measurement" value="" />
        <Picker.Item label="Piece" value="Piece" />
        <Picker.Item label="Kg" value="Kg" />
        <Picker.Item label="Bag" value="Bag" />
      </Picker>

      <Text style={styles.label}>Barcode:</Text>
      <TextInput style={styles.input} value={barcode} onChangeText={setBarcode} keyboardType="numeric" />

      <Text style={styles.label}>Category:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={categoryId} onValueChange={setCategoryId}>
          <Picker.Item label="Select Category" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat.value} label={cat.label} value={cat.value.toString()} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Status:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={status} onValueChange={setStatus}>
          <Picker.Item label="Select Status" value="" />
          {statuses.map((s) => (
            <Picker.Item key={s.value} label={`${s.label} (ID: ${s.value})`} value={s.value.toString()} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Image:</Text>
      <TouchableOpacity onPress={handleChooseImage} style={styles.uploadButton}>
        <Text style={styles.uploadText}>{image ? 'Image Selected' : 'Upload Product Image'}</Text>
      </TouchableOpacity>

      {image?.uri && (
        <Image
          source={{ uri: image.uri }}
          style={styles.previewImage}
        />
      )}

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Price:</Text>
          <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Quantity:</Text>
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
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
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    marginTop: 5,
  },
  picker: {
    height: 50,
    marginTop: 5,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 14,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 0.48,
  },
  button: {
    backgroundColor: '#457BFF',
    padding: 12,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  uploadButton: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default EditProductScreen;