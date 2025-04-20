import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { fetchStockHistory } from '../services/stockHistoryApi';
import { getStockLevels } from '../services/product';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { checkRoleAccess } from '../utils/checkRoleAccess';

const screenWidth = Dimensions.get('window').width;

const StockHistoryReportScreen = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [stockLevels, setStockLevels] = useState([]);
  const navigation = useNavigation();


 useEffect(() => {
    checkRoleAccess([2], navigation); 
  }, [navigation]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchStockHistory();
        setData(response);

        const uniqueCats = [
          ...new Set(
            response
              .map((d) => d.product?.category?.name)
              .filter((name) => !!name)
          ),
        ];
        setCategories(uniqueCats);

        if (!selectedCategory && uniqueCats.length > 0) {
          setSelectedCategory(uniqueCats[0]);
        }

        const stockLevelRes = await getStockLevels();
        setStockLevels(stockLevelRes);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const filteredData = data.filter(
    (item) =>
      item?.product?.category?.name?.toLowerCase() === selectedCategory?.toLowerCase()
  );

  const totalCategoryQuantity = filteredData.reduce(
    (sum, item) => sum + (item.quantityAfter || 0),
    0
  );

  const currentStock = stockLevels.find(
    (s) => s.categoryName?.toLowerCase() === selectedCategory?.toLowerCase()
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>{`Quantity Changed: ${item.quantity}`}</Text>
      <Text style={styles.text}>{`Quantity After: ${item.quantityAfter}`}</Text>
      <Text style={styles.text}>{`Date: ${new Date(item.createdAt).toLocaleString()}`}</Text>
      {item.product && (
        <>
          <Text style={styles.productTitle}>{`🛒 ${item.product.name}`}</Text>
          <Text style={styles.subText}>{`📦 ${item.product.description}`}</Text>
          <Text style={styles.subText}>{`🔢 Unit: ${item.product.unitMeasurement}`}</Text>
          {item.product.inventory && (
            <>
              <Text style={styles.subText}>{`🏬 ${item.product.inventory.name}`}</Text>
              {item.product.inventory.location && (
                <Text style={styles.subText}>{`📍 ${item.product.inventory.location.address}`}</Text>
              )}
            </>
          )}
        </>
      )}
    </View>
  );

  const chartData = {
    labels: filteredData.map((d) =>
      d.product?.name?.length > 6 ? d.product.name.slice(0, 6) + '…' : d.product?.name || 'N/A'
    ),
    datasets: [
      {
        data: filteredData.map((d) => d.quantityAfter || 0),
      },
    ],
  };
  
  const listHeader = (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryTabs}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.tabButton,
              selectedCategory === cat && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.tabText,
                selectedCategory === cat && styles.tabTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* <View style={styles.dateRow}>
        <TextInput placeholder="Start Date" style={styles.dateInput} />
        <TextInput placeholder="End Date" style={styles.dateInput} />
      </View> */}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>{`Total ${selectedCategory} History`}</Text>
        <Text style={styles.summaryValue}>{totalCategoryQuantity}</Text>
      </View>

      {currentStock && (
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Current Stock Level</Text>
          <Text style={styles.summaryValue}>{currentStock.totalQuantity}</Text>
        </View>
      )}

      <View style={styles.chartContainer}>
        <Text style={styles.chartLabel}>Quantity After per Entry</Text>
        <BarChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          yAxisLabel=""
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
   {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Stock History</Text>
      </View>
  
      {loading ? (
        <ActivityIndicator size="large" color="#1042c7" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={listHeader}
        />
      )}
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(16, 66, 199, ${opacity})`,
  labelColor: () => '#3c6ef3',
  barPercentage: 0.6,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6ff',
  },
  header: {
    backgroundColor: '#7BA4FF',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60, // Optional for symmetry
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  categoryTabs: {
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#b9ccff',
    marginRight: 10,
  },
  tabButtonActive: {
    backgroundColor: '#3c6ef3',
  },
  tabText: {
    color: '#1042c7',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  dateInput: {
    width: '40%',
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderColor: '#3c6ef3',
    borderWidth: 1,
    textAlign: 'center',
  },
  summaryCard: {
    margin: 16,
    backgroundColor: '#dfe7ff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c6ef3',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1042c7',
    marginTop: 4,
  },
  chartContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  chartLabel: {
    fontSize: 18,
    color: '#3c6ef3',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  chart: {
    borderRadius: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    color: '#1042c7',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3c6ef3',
    marginTop: 8,
  },
  subText: {
    fontSize: 13,
    color: '#1042c7',
    marginLeft: 4,
    marginBottom: 2,
  },
});

export default StockHistoryReportScreen;
