import axios from 'axios';

const BASE_URL = 'http://localhost:8080/himalayanbus/bus';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const countAllBus = async (authToken) => {
    try {
        const response = await axiosInstance.get('/count', {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all buses:', error);
        throw error;
    }
};



export const searchBusByRoute = async (routeFrom, routeTo, authToken) => {
    try {
        const response = await axiosInstance.get(`/search/${routeFrom}/${routeTo}`, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching buses by route:', error);
        throw error;
    }
};

