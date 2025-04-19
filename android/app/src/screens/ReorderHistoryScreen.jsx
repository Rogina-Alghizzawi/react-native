import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchReorderHistory } from '../services/reorderApi';

const ReorderHistoryScreen = () => {
  const [reorders, setReorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [filteredReorders, setFilteredReorders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchReorderHistory();
        setReorders(response);
        setFilteredReorders(response);
      } catch (error) {
        console.error('Failed to fetch reorder data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!startDate && !endDate) {
      setFilteredReorders(reorders);
      return;
    }
    const filtered = reorders.filter((item) => {
      const itemDate = new Date(item.createdAt);
      const isAfterStart = startDate ? itemDate >= new Date(startDate) : true;
      const isBeforeEnd = endDate ? itemDate <= new Date(endDate) : true;
      return isAfterStart && isBeforeEnd;
    });
    setFilteredReorders(filtered);
  }, [startDate, endDate, reorders]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.details}>
          <Text style={styles.title}>{item.product?.name || 'N/A'}</Text>
          <Text style={styles.meta}><Text style={styles.label}>Category:</Text> Electronics</Text>
          <Text style={styles.meta}><Text style={styles.label}>Quantity:</Text> {item.quantity}</Text>
          <Text style={styles.meta}><Text style={styles.label}>Supplier:</Text> {item.supplier?.name}</Text>
          <Text style={styles.meta}><Text style={styles.label}>Status:</Text> Completed</Text>
          <Text style={styles.meta}>
            <Text style={styles.label}>Reordered On:</Text> {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.headerText}>Reorder History</Text>
      </View>

      <View style={styles.dateFilterRow}>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowStartPicker(true)}>
          <Text>{startDate || 'Start Date'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowEndPicker(true)}>
          <Text>{endDate || 'End Date'}</Text>
        </TouchableOpacity>
      </View>

      {showStartPicker && (
        <View>
          <DateTimePicker
            value={startDate ? new Date(startDate) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              setShowStartPicker(false);
              if (selectedDate) {
                setStartDate(selectedDate.toISOString().split('T')[0]);
              }
            }}
          />
        </View>
      )}

      {showEndPicker && (
        <View>
          <DateTimePicker
            value={endDate ? new Date(endDate) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              setShowEndPicker(false);
              if (selectedDate) {
                setEndDate(selectedDate.toISOString().split('T')[0]);
              }
            }}
          />
        </View>
      )}

      <FlatList
        data={filteredReorders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerCard: {
    backgroundColor: '#5b84ea',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    gap: 8,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  meta: {
    fontSize: 13,
    color: '#555',
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
});

export default ReorderHistoryScreen;