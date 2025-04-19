import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerTest = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const onChange = (event, date) => {
        setShowPicker(false);
        console.log('pressed:', date); // ✅ This logs the actual selected date
      
        if (date) {
          setSelectedDate(date.toISOString().split('T')[0]);
        }
      };
      
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Test Date Picker</Text>
        <TouchableOpacity style={styles.button} onPress={() => setShowPicker(true)}>
          <Text>{selectedDate || 'Select a Date'}</Text>
        </TouchableOpacity>
  
        {showPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onChange}
          />
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
    button: {
      backgroundColor: '#eee',
      padding: 14,
      borderRadius: 10,
      alignItems: 'center',
    },
  });
  export default DatePickerTest;