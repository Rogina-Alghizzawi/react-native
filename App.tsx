import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import StaffRegister from './android/app/src/screens/StaffRegister'; // Adjust the import path as necessary
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <StaffRegister />
    </SafeAreaView>
  );
}

export default App;
