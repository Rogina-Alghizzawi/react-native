import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { pickImage } from '../utils/imagePickerHelper';
import { getProductById, updateProductById, uploadImage } from '../services/product';

const EditProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [unitMeasurement, setUnitMeasurement] = useState('');
  const [barcode, setBarcode] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('1');
  const [status, setStatus] = useState('1');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params as { productId: string };

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
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleUpdate = async () => {
    try {
      let imagePath = image?.uri;

      if (image && image.uri && !image.uri.startsWith('http')) {
        imagePath = await uploadImage(image);
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

      navigation.goBack();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleChooseImage = async () => {
    await pickImage(setImage);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#457BFF" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name:</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
        placeholder="ex: bag"
      />

      <Text style={styles.label}>Unit Measurement:</Text>
      <Picker
        selectedValue={unitMeasurement}
        onValueChange={setUnitMeasurement}
        style={styles.picker}
      >
        <Picker.Item label="Select Measurement" value="" />
        <Picker.Item label="Piece" value="Piece" />
        <Picker.Item label="Kg" value="Kg" />
        <Picker.Item label="Bag" value="Bag" />
      </Picker>

      <Text style={styles.label}>Bar-code:</Text>
      <TextInput
        style={styles.input}
        value={barcode}
        onChangeText={setBarcode}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={categoryId}
        onValueChange={setCategoryId}
        style={styles.picker}
      >
        <Picker.Item label="Category 1" value="1" />
        <Picker.Item label="Category 2" value="2" />
        <Picker.Item label="Category 3" value="3" />
      </Picker>

      <Text style={styles.label}>Status:</Text>
      <Picker
        selectedValue={status}
        onValueChange={setStatus}
        style={styles.picker}
      >
        <Picker.Item label="Active" value="1" />
        <Picker.Item label="Inactive" value="0" />
      </Picker>

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Image:</Text>
      <TouchableOpacity onPress={handleChooseImage}>
        <Text style={styles.fileButton}>Choose Image</Text>
        <Text style={styles.fileName}>
          {image?.fileName || image?.uri?.split('/').pop()}
        </Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
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
  fileButton: {
    color: '#457BFF',
    marginTop: 10,
  },
  fileName: {
    color: '#444',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 0.45,
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
});

export default EditProductScreen;