import axios from 'axios';

const BASE_URL = 'http://localhost:8080/himalayanbus/user';


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getUserInformationByEmail = async (userEmail, authToken) => {
  try {
    const response = await axiosInstance.get(`/${userEmail}`, {
      headers: {
        ...axiosInstance.defaults.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user information:', error);
    throw error;
  }
};




export const updatePasswordForUser = async (email, oldPassword, newPassword, authToken) => {
  try {
    const response = await axiosInstance.put('/updatePassword', null, {
      params: {
        email,
        oldPassword,
        newPassword,
      },
      headers: {
        ...axiosInstance.defaults.headers,
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};







export default axiosInstance;



