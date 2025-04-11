import axios from 'axios';

const API_URL = 'http://10.0.2.2:7004/api';

export const registerStaff = async (userData: any) => {
  return await axios.post(`${API_URL}/Users`, {
    ...userData,
    roleId: 3,
    active: 'Y',
    approvalStatus: 'Pending'
  });
};
