import React, { useState, useEffect } from 'react';
import {
  Text, TextInput, TouchableOpacity, View, ScrollView,
  StyleSheet, Alert, Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { registerStaff } from '../services/userservices';
import { getLocations } from '../services/locationService';
// import LogoSvg from '../assets/SVG/logo.svg';
import UserIcon from '../assets/SVG/user.svg';
import LockIcon from '../assets/SVG/lock.svg';
import MailIcon from '../assets/SVG/mail.svg';
import MapPinIcon from '../assets/SVG/map-pin.svg';
import PhoneIcon from '../assets/SVG/phone.svg';
import EyeIcon from '../assets/SVG/eye.svg';
import EyeOffIcon from '../assets/SVG/eye-off.svg';

const StaffRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [locationId, setLocationId] = useState('');
  const [locations, setLocations] = useState<{ label: string; value: string }[]>([]);
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (err) {
        console.error('Location fetch failed', err);
      }
    };
    loadLocations();
  }, []);

  const handleRegister = async () => {
    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        locationId: parseInt(locationId),
        phone,
        imagePath: image?.uri || '',
      };

      const response = await registerStaff(userData);

      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "Success",
          "Staff registered successfully. Awaiting confirmation.",
          [
            {
              text: "OK",
              onPress: () => {
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setPhone('');
                setLocationId('');
                setImage(null);
                // navigation.navigate('Login');
              }
            }
          ]
        );
      } else {
        Alert.alert("Error", "Failed to register staff.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result?.assets && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
{/* <LogoSvg width={300} height={80} style={{ marginBottom: 20 }} /> */}
      
        <Image
          source={require('../assets//Images/logo.png')}
          resizeMode="contain"
          style={{ width: 900, height: 100, borderRadius: 50, marginBottom: 20 }}
        />
      

      <View style={styles.inputContainer}>
       <UserIcon width={20} height={20} style={styles.icon} />
        <TextInput placeholder="First Name" style={styles.input} value={firstName} onChangeText={setFirstName} />
      </View>

      <View style={styles.inputContainer}>
       <UserIcon width={20} height={20} style={styles.icon} />
       <TextInput placeholder="Last Name" style={styles.input} value={lastName} onChangeText={setLastName} />
      </View>

      <View style={styles.inputContainer}>
<MailIcon width={20} height={20} style={styles.icon} />
        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail} />
      </View>

      <View style={styles.inputContainer}>
       <LockIcon width={20} height={20} style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            < EyeIcon width={20} height={20} style={styles.iconRight} />
          ) : (
            <EyeOffIcon width={20} height={20} style={styles.iconRight} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <MapPinIcon width={20} height={20} style={styles.icon} />
        <Picker
          selectedValue={locationId}
          onValueChange={setLocationId}
          style={styles.picker}
        >
          <Picker.Item label="Select Location" value="" />
          {locations.map(loc => (
            <Picker.Item key={String(loc.value)} label={loc.label} value={String(loc.value)} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <PhoneIcon width={20} height={20} style={styles.icon} />
        <TextInput placeholder="Phone (optional)" style={styles.input} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      </View>

      <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
        <Text style={styles.uploadText}>Upload Image</Text>
      </TouchableOpacity>

      {image?.uri && (
        <Image source={{ uri: image.uri }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    width: '100%',
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333'
  },
  picker: {
    flex: 1,
    color: '#333',
    fontSize: 15,
    marginLeft: -8,
  },
  icon: {
    marginRight: 10,
    color: '#666',
  },
  iconRight: {
    marginLeft: 10,
    color: '#666',
  },
  uploadButton: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  uploadText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold'
  },
  previewImage: {
    width: '100%',
    height: 250,
    marginTop: 15,
    borderRadius: 15,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 30,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loginLink: {
    fontSize: 14,
    color: '#333',
    marginTop: 20
  }
});

export default StaffRegister;
