import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { createProduct } from '../services/product';
import { getLocations } from '../services/locationService'; // ✅ import your location service

const AddProductScreen = () => {
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]); // ✅ state to hold dropdown options
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [supplier, setSupplier] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations', error);
      }
    };
    fetchLocations();
  }, []);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result?.assets && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!category || !productName || !location || !quantity || !price || !supplier) {
      Alert.alert('❗ Error', 'All fields are required.');
      return;
    }

    try {
      await createProduct({
        name: productName,
        categoryId: parseInt(category),
        price: parseFloat(price),
        barcode: '1234567890',
        quantity: parseInt(quantity),
        status: 1,
        supplierId: parseInt(supplier),
        inventoryId: parseInt(location),
        unitMeasurement: 'Piece',
        description: 'Added via mobile app',
        imagePath: image?.uri || '',
      });

      Alert.alert('✅ Success', 'Product created successfully');
    } catch (error) {
      Alert.alert('❌ Error', 'Failed to create product');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Add New Product</Text>

      <TextInput style={styles.input} placeholder="Category ID" onChangeText={setCategory} value={category} />
      <TextInput style={styles.input} placeholder="Product Name" onChangeText={setProductName} value={productName} />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={location}
          onValueChange={(value) => setLocation(value)}
        >
          <Picker.Item label="Select Inventory Location" value="" />
          {locations.map((loc) => (
            <Picker.Item key={loc.value} label={loc.label} value={loc.value} />
          ))}
        </Picker>
      </View>

      <TextInput style={styles.input} placeholder="Quantity" keyboardType="numeric" onChangeText={setQuantity} value={quantity} />
      <TextInput style={styles.input} placeholder="Price" keyboardType="decimal-pad" onChangeText={setPrice} value={price} />
      <TextInput style={styles.input} placeholder="Supplier ID" onChangeText={setSupplier} value={supplier} />

      <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
        <Text style={styles.uploadText}>{image ? 'Image Selected' : 'Upload Product Image'}</Text>
      </TouchableOpacity>

      {image?.uri && (
        <Image source={{ uri: image.uri }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Add Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#f4f6fc',
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1042c7',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 14,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 14,
    borderColor: '#ccc',
    borderWidth: 1,
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
  previewImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#316BFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddProductScreen;
