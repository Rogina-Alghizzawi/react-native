import axios from 'axios';

const API_URL = 'http://10.0.2.2:7004/api'; 

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/Category`);
  return response.data.map((cat: any) => ({
    label: cat.name,   
    value: cat.id,
  }));
};
