import axios from 'axios';

export const getSuppliers = async () => {
  const response = await axios.get('http://10.0.2.2:7004/api/Suppliers');
  return response.data;
};
