import axios from 'axios';

const BASE_URL = 'http://localhost:8080/himalayanbus/route';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const addRoute = async (newRoute, authToken) => {
    try {
        const response = await axiosInstance.post('/add', newRoute, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding route:', error);
        throw error;
    }
};

export const updateRoute = async (routeId, updatedRoute, authToken) => {
    try {
        const response = await axiosInstance.put(`/update/${routeId}`, updatedRoute, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating route:', error);
        throw error;
    }
};

export const getRoute = async (routeId, authToken) => {
    try {
        const response = await axiosInstance.get(`/view/${routeId}`, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching route:', error);
        throw error;
    }
};

export const getAllRoutes = async (authToken) => {
    try {
        const response = await axiosInstance.get('/viewAll', {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all routes:', error);
        throw error;
    }
};

export const deleteRoute = async (routeId, authToken) => {
    try {
        const response = await axiosInstance.delete(`/delete/${routeId}`, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting route:', error);
        throw error;
    }
};


export const countAllRoute = async (authToken) => {
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

