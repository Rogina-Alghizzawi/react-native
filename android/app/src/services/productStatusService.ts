import axios from 'axios';

const API_URL = 'http://10.0.2.2:7004/api';

export const getProductStatuses = async () => {
  const response = await axios.get(`${API_URL}/ProductStatus`);
  return response.data.map((status: any) => ({
    label: status.name || `Status ${status.id}`,
    value: status.id,
  }));
};
