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
import { getInventories } from '../services/inventoryService';
import { getCategories } from '../services/categoryService';
import { getSuppliers } from '../services/supplier';
import { getProductStatuses } from '../services/productStatusService';
import { useNavigation } from '@react-navigation/native';

const AddProductScreen = () => {
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [inventoryList, setInventoryList] = useState([]);
  const [selectedInventory, setSelectedInventory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [supplier, setSupplier] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [status, setStatus] = useState('1');
  const [unitMeasurement, setUnitMeasurement] = useState('Piece');
  const [description, setDescription] = useState('');
  const [statuses, setStatuses] = useState([]);
    const navigation = useNavigation();
  
  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const data = await getInventories();
        setInventoryList(data);
      } catch (error) {
        console.error('Error fetching inventories', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers', error);
      }
    };

    const fetchStatuses = async () => {
      try {
        const data = await getProductStatuses();
        setStatuses(data);
      } catch (error) {
        console.error('Error fetching statuses', error);
      }
    };

    fetchStatuses();
    fetchSuppliers();
    fetchCategories();
    fetchInventories();
  }, []);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result?.assets && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!category || !productName.trim() || !selectedInventory || !quantity || !price || !supplier || !barcode.trim() || !status || !unitMeasurement || !description.trim() || !image?.uri) {
      Alert.alert('❗ Error', 'Please fill out all required fields.');
      return;
    }

    try {
      await createProduct({
        name: productName.trim(),
        categoryId: parseInt(category),
        price: parseFloat(price),
        barcode: barcode.trim(),
        quantity: parseInt(quantity),
        status: parseInt(status),
        supplierId: parseInt(supplier),
        inventoryId: parseInt(selectedInventory),
        unitMeasurement: unitMeasurement,
        description: description.trim(),
        imagePath: image.uri,
      });

      Alert.alert('✅ Success', 'Product created successfully');
      navigation.navigate('Stock');

    } catch (error) {
      console.error('❌ Error creating product:', error);
      Alert.alert('❌ Error', 'Failed to create product');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* <View style={styles.header}>
      </View> */}
        <Text style={styles.headerText}>Add New Product</Text>

      <View style={styles.card}>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={category} onValueChange={setCategory}>
            <Picker.Item label="Select Category" value="" />
            {categories.map((cat) => (
              <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
            ))}
          </Picker>
        </View>

        <TextInput style={styles.input} placeholder="Product Name" onChangeText={setProductName} value={productName} />

        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedInventory} onValueChange={setSelectedInventory}>
            <Picker.Item label="Select Inventory" value="" />
            {inventoryList.map((inv) => (
              <Picker.Item key={inv.value} label={inv.label} value={inv.value} />
            ))}
          </Picker>
        </View>

        {/* <TextInput style={styles.input} placeholder="Quantity" keyboardType="numeric" onChangeText={setQuantity} value={quantity} /> */}
            <Text style={{ marginBottom: 6, fontWeight: '600' }}>Quantity</Text>
            <View style={styles.compactInputRow}>
              <TouchableOpacity style={styles.compactAdjustButton} onPress={() => setQuantity((prev) => `${Math.max(0, parseInt(prev || '0') - 1)}`)}>
                <Text style={styles.compactAdjustText}>-</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.compactInput}
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
              />

              <TouchableOpacity style={styles.compactAdjustButton} onPress={() => setQuantity((prev) => `${parseInt(prev || '0') + 1}`)}>
                <Text style={styles.compactAdjustText}>+</Text>
              </TouchableOpacity>
            </View>



        <Text style={{ marginBottom: 6, fontWeight: '600' }}>Price</Text>
          <View style={styles.compactInputRow}>
            <TouchableOpacity
              style={styles.compactAdjustButton}
              onPress={() =>
                setPrice((prev) => {
                  const current = parseFloat(prev || '0');
                  return current > 0 ? (current - 1).toFixed(2) : '0';
                })
              }
            >
              <Text style={styles.compactAdjustText}>-</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.compactInput}
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />

            <TouchableOpacity
              style={styles.compactAdjustButton}
              onPress={() =>
                setPrice((prev) => {
                  const current = parseFloat(prev || '0');
                  return (current + 1).toFixed(2);
                })
              }
            >
              <Text style={styles.compactAdjustText}>+</Text>
            </TouchableOpacity>
          </View>


        <View style={styles.pickerContainer}>
          <Picker selectedValue={supplier} onValueChange={setSupplier}>
            <Picker.Item label="Select Supplier" value="" />
            {suppliers.map((sup) => (
              <Picker.Item key={sup.value} label={sup.label} value={sup.value} />
            ))}
          </Picker>
        </View>

        <TextInput style={styles.input} placeholder="Barcode" onChangeText={setBarcode} value={barcode} />

        <View style={styles.pickerContainer}>
          <Picker selectedValue={status} onValueChange={setStatus}>
            <Picker.Item label="Select Status" value="" />
            {statuses.map((s) => (
              <Picker.Item key={s.value} label={`${s.label} (ID: ${s.value})`} value={s.value.toString()} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker selectedValue={unitMeasurement} onValueChange={setUnitMeasurement}>
            <Picker.Item label="Piece" value="Piece" />
            <Picker.Item label="Kg" value="Kg" />
            <Picker.Item label="Liter" value="Liter" />
            <Picker.Item label="Box" value="Box" />
          </Picker>
        </View>

        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Description"
          onChangeText={setDescription}
          value={description}
          multiline
        />

        <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
          <Text style={styles.uploadText}>{image ? 'Image Selected' : 'Upload Product Image'}</Text>
        </TouchableOpacity>

        {image?.uri && <Image source={{ uri: image.uri }} style={styles.previewImage} />}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Add Product</Text>
        </TouchableOpacity>
      </View>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 25,
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
  compactInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 14,
    backgroundColor: '#fff',
  },
  
  compactAdjustButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#EAF1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  compactAdjustText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#457BFF',
  },
  
  compactInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  
  
});

export default AddProductScreen;
