
import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:7004/api';

export const getTurnoverReport = async () => {
  const response = await axios.get(`${BASE_URL}/InventoryAnalytics/turnover`);
  return response.data;
};

export const getCategoryStats = async () => {
  const response = await axios.get(`${BASE_URL}/InventoryAnalytics/categories/stats`);
  return response.data;
};

export const getUserCount = async () => {
  const response = await axios.get(`${BASE_URL}/Users/NumberOfUsers`);
  return response.data;
};

export const getActiveUsers = async () => {
  const response = await axios.get(`${BASE_URL}/Users/count/active`);
  return response.data;
};
