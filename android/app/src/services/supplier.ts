import axios from 'axios';
const API_URL = 'http://10.0.2.2:7004/api';
export const getSuppliers = async () => {
  const response = await axios.get(`${API_URL}/Suppliers`);
  return response.data.map((sup: any) => ({
    label: sup.name,
    value: sup.id,
  }));
};
