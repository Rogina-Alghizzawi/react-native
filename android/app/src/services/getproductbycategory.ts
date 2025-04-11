import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:7004/api';

export const getStockLevels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/StockHistory/GetStockLevels`);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return [];
  }
};
