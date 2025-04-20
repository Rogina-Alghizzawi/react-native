// utils/checkRoleAccess.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { Alert } from 'react-native';

export const checkRoleAccess = async (allowedRoles: number[], navigation: any): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('Access Denied', 'You are not logged in.');
      navigation.navigate('login');
      return false;
    }

    const decoded: any = jwtDecode(token);
    const roleId = parseInt(decoded.Role_Id);

    if (!allowedRoles.includes(roleId)) {
      Alert.alert('Access Denied', 'You do not have permission to access this page.');
      navigation.goBack();
      return false;
    }

    return true;
  } catch (err) {
    Alert.alert('Error', 'Something went wrong.');
    navigation.navigate('login');
    return false;
  }
};
