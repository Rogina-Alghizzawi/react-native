import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import {
  getTurnoverReport,
  getCategoryStats,
  getUserCount,
  getActiveUsers
} from '../services/inventoryAnalyticsService';

const screenWidth = Dimensions.get('window').width;

const InventoryAnalyticsScreen = () => {
  const [reportData, setReportData] = useState([]);
  const [categoryChartData, setCategoryChartData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [turnoverChartData, setTurnoverChartData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [turnover, categoryStats, totalUsers, activeUsers] = await Promise.all([
        getTurnoverReport(),
        getCategoryStats(),
        getUserCount(),
        getActiveUsers()
      ]);
  
      setTotalUserCount(totalUsers);
      setActiveUserCount(activeUsers);
  
      const top5Turnover = turnover.slice(0, 5);
      const top5Categories = categoryStats.slice(0, 5);
  
      setTurnoverChartData({
        labels: top5Turnover.map(item =>
          item.productName.length > 10 ? item.productName.substring(0, 10) + '…' : item.productName
        ),
        datasets: [{ data: top5Turnover.map(item => item.turnoverRate) }]
      });
  
      setCategoryChartData({
        labels: top5Categories.map(item =>
          item.categoryName.length > 10 ? item.categoryName.substring(0, 10) + '…' : item.categoryName
        ),
        datasets: [{ data: top5Categories.map(item => item.totalStockInCategory) }]
      });
  
    } catch (error) {
      console.error('Data load error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  if (loading) {
    return <ActivityIndicator size="large" color="#5C6AC4" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Inventory Analytics Dashboard</Text>

      {/* User Stats */}
      <View style={styles.statCardContainer}>
        <View style={[styles.statCard, { backgroundColor: '#334155' }]}>
          <Text style={styles.statText}>🟢 Active Users: {activeUserCount}</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#5C6AC4' }]}>
          <Text style={styles.statText}>👥 Total Users: {totalUserCount}</Text>
        </View>
      </View>

      {/* Bar Chart - Turnover Rate */}
      <Text style={styles.chartTitle}>📈 Turnover Rate by Product</Text>
<View style={styles.tableContainer}>
  <View style={[styles.tableRow, styles.tableHeader]}>
    <Text style={styles.tableCellHeader}>#</Text>
    <Text style={styles.tableCellHeader}>Product</Text>
    <Text style={styles.tableCellHeader}>Stock</Text>
    <Text style={styles.tableCellHeader}>Sold</Text>
    <Text style={styles.tableCellHeader}>Turnover</Text>
  </View>
  {reportData.slice(0, 5).map((item, index) => (
    <View key={index} style={styles.tableRow}>
      <Text style={styles.tableCell}>{index + 1}</Text>
      <Text style={styles.tableCell}>
        {item.productName.length > 12 ? item.productName.substring(0, 12) + '…' : item.productName}
      </Text>
      <Text style={styles.tableCell}>{item.currentStock}</Text>
      <Text style={styles.tableCell}>{item.totalSold}</Text>
      <Text style={styles.tableCell}>{item.turnoverRate}</Text>
    </View>
  ))}
</View>


      {/* Bar Chart - Stock by Category */}
      <Text style={styles.chartTitle}>📦 Total Stock per Category</Text>
      <BarChart
        data={categoryChartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        style={styles.chart}
      />
    </ScrollView>
  );
};

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(92, 106, 196, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForLabels: {
      fontSize: 12
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#5C6AC4'
    },
    barPercentage: 0.6,
  };
  

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#f9fafb',
      flex: 1
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
      color: '#5C6AC4',
      fontWeight: 'bold'
    },
    statCardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    statCard: {
      padding: 15,
      borderRadius: 12,
      width: '48%',
      elevation: 3
    },
    statText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600'
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16
    },
    chartTitle: {
      fontSize: 18,
      marginTop: 10,
      marginBottom: 5,
      fontWeight: '600',
      color: '#1f2937'
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 20
      },
      tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff'
      },
      tableHeader: {
        backgroundColor: '#5C6AC4'
      },
      tableCellHeader: {
        flex: 1,
        padding: 8,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 13,
        textAlign: 'center'
      },
      tableCell: {
        flex: 1,
        padding: 8,
        fontSize: 13,
        textAlign: 'center',
        color: '#1e293b'
      }
      
  });
  
export default InventoryAnalyticsScreen;
