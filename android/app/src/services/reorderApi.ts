import axios from 'axios';


const API_URL = 'http://10.0.2.2:7004/api';

export const fetchReorderHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/Reorder`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch reorder history:', error);
    return [];
  }
};
