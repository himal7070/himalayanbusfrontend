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


export const viewAllBus = async (authToken) => {
    try {
        const response = await axiosInstance.get('/viewAll', {
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




export const searchBusByRoute = async (routeFrom, routeTo, authToken, journeyDate) => {
    try {
        let url = `/search/${routeFrom}/${routeTo}`;
        if (journeyDate) {
            url += `?journeyDate=${journeyDate}`;
        }

        const response = await axiosInstance.get(url, {
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
