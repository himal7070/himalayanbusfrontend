import axios from 'axios';

const BASE_URL = 'http://localhost:8080/himalayanbus/reservation';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const countTodayReservations = async (authToken) => {
    try {
        const response = await axiosInstance.get('/count', {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all reservation:', error);
        throw error;
    }
};



export const addReservation = async (reservationData, busId, authToken) => {
    try {
        const response = await axiosInstance.post(`/add?busId=${busId}`, reservationData, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding reservation:', error);
        throw error;
    }
};



export const updateReservation = async (reservationData, authToken) => {
    try {
        const response = await axiosInstance.put('/update', reservationData, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating reservation:', error);
        throw error;
    }
};


export const viewReservation = async (reservationId, authToken) => {
    try {
        const response = await axiosInstance.get(`/viewReservation/${reservationId}`, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error viewing reservation:', error);
        throw error;
    }
};


export const getAllReservations = async (authToken) => {
    try {
        const response = await axiosInstance.get('/all', {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        throw error;
    }
};


export const viewReservationsForCurrentUser = async (authToken) => {
    try {
        const response = await axiosInstance.get('/current-user', {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });

        return response.data.map((reservation) => {
            const {departureTime, arrivalTime} = reservation.bus;
            return {
                ...reservation,
                departureTime,
                arrivalTime,
            };
        });
    } catch (error) {
        console.error('Error fetching reservations for current user:', error);
        throw error;
    }
};



export const deleteReservation = async (reservationId, authToken) => {
    try {
        const response = await axiosInstance.delete(`/delete/${reservationId}`, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting reservation:', error);
        throw error;
    }
};

export default axiosInstance;
