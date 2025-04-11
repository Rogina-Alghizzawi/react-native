// services/locationService.ts
import axios from 'axios';

const API_URL = 'http://10.0.2.2:7004/api';

export const getLocations = async () => {
  const response = await axios.get(`${API_URL}/Location`);
  return response.data.map((loc: any) => ({
    label: loc.address,  
    value: loc.id
  }));
};
