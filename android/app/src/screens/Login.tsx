import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import LockIcon from '../assets/SVG/lock.svg';
import MailIcon from '../assets/SVG/mail.svg';
import EyeIcon from '../assets/SVG/eye.svg';
import EyeOffIcon from '../assets/SVG/eye-off.svg';



const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);



  interface MyJwtPayload {
    Role_Id: string;
  }


  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (password.length < 3) {
      Alert.alert("Weak Password", "Password must be at least 3 characters long.");
      return;
    }
  
    try {
      const response = await axios.post('http://10.0.2.2:7004/api/JWT/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const token = response.data; 
      const decoded = jwtDecode<MyJwtPayload>(token); 
      
  
      if (response.status === 200) {
        if (decoded && (decoded.Role_Id === "2" || decoded.Role_Id === "3")) {
          await AsyncStorage.setItem('userToken', token);
          Alert.alert("Success", "You are logged in!");
          navigation.navigate('Stock', { roleId: decoded.Role_Id });
        } else {
          Alert.alert("Access Denied", "You are not allowed to log in with this account.");
        }
      } else {
        
        Alert.alert("Login Failed", "Invalid email or password");

      }
    } catch (error: any) {
      console.error(error);
  
      if (error.response) {
        
        console.error(error.response?.data);  
        Alert.alert("Login Failed", error.response?.data?.message || "Invalid credentials");

      } else if (error.request) {
        
        Alert.alert("Network Error", "No response from the server. Please try again.");
      } else {
        
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    }
  };
  
  

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        <Text style={styles.header}>Welcome to Stockify</Text>
        <Image
          source={require('../assets/Images/logo.png')}
          style={{ width: 400, height: 300, resizeMode: 'contain', marginBottom: 7 }}
        />
      </View>

      {/* Email Input with Icon */}
      <View style={styles.inputContainer}>
       <MailIcon width={20} height={20} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={'#646464'}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input with Eye Icon */}
      <View style={styles.inputContainer}>
      <LockIcon width={20} height={20} style={styles.icon} />
      <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'#646464'}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
       <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            < EyeIcon width={20} height={20} style={styles.icon} />
          ) : (
            <EyeOffIcon width={20} height={20} style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <View>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.login}>Login</Text>
        </Pressable>
      </View>

      {/* Register Link */}
      <View style={styles.register}>
  <Text style={styles.register}>
    Don't have an account?{' '}
    <Text
      style={{ color: '#00ADEE', fontWeight: 'bold' }}
      onPress={() => navigation.navigate('StaffRegister')}
    >
      Register
    </Text>
  </Text>
</View>

    </View>
  );
}; // end

const styles = StyleSheet.create({
  register: {
    position: 'relative',
    top: 40,
    left: 45,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#212529'
  },
  login: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'relative',
    left: 155,
    color: 'white',
    top: 10,
    opacity: 1
  },
  button: {
    backgroundColor: '#3c6ef3',
    borderRadius: 20,
    height: 50,
    position: 'relative',
    top: 10,
    width: 370,
    left: 10
  },
  header: {
    fontWeight: 'bold',
    fontSize: 28,
    alignItems: 'center',
    color: '#4d4d4d',
    marginTop: -62,
    marginBottom: 15,
    position: 'relative',
    left: 15
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#c0c0c0',
    marginHorizontal: 12,
    marginVertical: 6,
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  eyeIcon: {
    paddingHorizontal: 4,
  },
});

export default Login;
