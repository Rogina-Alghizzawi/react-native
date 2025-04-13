// utils/imagePickerHelper.ts
import { launchImageLibrary } from 'react-native-image-picker';
// import { PermissionsAndroid, Platform, Alert } from 'react-native';

// export const pickImage = async (setImage: (img: any) => void) => {
//   try {
//     // 🛡 Android 13+ permission
//     if (Platform.OS === 'android') {
//       const permission =
//         Platform.Version >= 33
//           ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
//           : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

//       const granted = await PermissionsAndroid.request(permission);

//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         Alert.alert("Permission denied", "App needs access to your media to upload an image.");
//         return;
//       }
//     }

//     const result = await launchImageLibrary({
//       mediaType: 'photo',
//       quality: 0.8,
//       selectionLimit: 1,
//     });

//     if (result.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (result.errorCode) {
//       console.error('ImagePicker Error:', result.errorMessage);
//     } else if (result.assets?.length) {
//       setImage(result.assets[0]); // ✅ image set here
//     }
//   } catch (err) {
//     console.error('Image picker failed:', err);
//   }
// };
// utils/imagePickerHelper.ts

export const pickImage = async (setImage: (img: any) => void) => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    quality: 0.8,
    selectionLimit: 1,
  });

  if (result.didCancel) {
    console.log('User cancelled image picker');
  } else if (result.errorCode) {
    console.error('ImagePicker Error:', result.errorMessage);
  } else if (result.assets?.length) {
    setImage(result.assets[0]);
  }
};
