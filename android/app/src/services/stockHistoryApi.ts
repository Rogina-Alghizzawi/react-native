import axios from 'axios';



const API_URL = 'http://10.0.2.2:7004/api';

export const fetchStockHistory = async () => {
  const response = await axios.get(`${API_URL}/StockHistory`);
  return response.data;
};
