import axios from 'axios';

const BASE_URL = 'http://localhost:8080/himalayanbus/admin';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const countAllAdmin = async (authToken) => {
    try {
        const response = await axiosInstance.get('/count', {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all passengers:', error);
        throw error;
    }
};

