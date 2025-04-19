import axios from 'axios';

const API_URL = 'http://10.0.2.2:7004/api';



export const getInventories = async () => {
  const response = await axios.get(`${API_URL}/Inventory`);
  return response.data.map((inv: any) => ({
    label: inv.name,  // Just the name
    value: inv.id     // Inventory ID
  }));
};
