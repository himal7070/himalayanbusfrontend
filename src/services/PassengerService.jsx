import axios from 'axios';

const BASE_URL = 'http://localhost:8080/himalayanbus/passenger';


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});



export const addPassenger = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};


export const updatePassengerDetails = async (passengerID, updatedPassenger, authToken) => {
    try {
        const response = await axiosInstance.put(`/updateDetails/${passengerID}`, updatedPassenger, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating passenger details:', error);
        throw error;
    }
};

export const updatePasswordForPassenger = async (passengerID, newPassword, authToken) => {
    try {
        const response = await axiosInstance.put(`/updatePassword/${passengerID}`, `"${newPassword}"`, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating password for passenger:', error);
        throw error;
    }
};



export const getPassenger = async (passengerId, authToken) => {
    try {
        const response = await axiosInstance.get(`/get/${passengerId}`, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching passenger:', error);
        throw error;
    }
};

export const getAllPassengers = async (authToken) => {
    try {
        const response = await axiosInstance.get('/viewAll', {
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





export const deletePassenger = async (passengerId, authToken) => {
    try {
        const response = await axiosInstance.delete(`/delete/${passengerId}`, {
            headers: {
                ...axiosInstance.defaults.headers,
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting passenger:', error);
        throw error;
    }
};


export const countAllPassengers = async (authToken) => {
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


export const getUserInformationByEmail = async (userEmail, authToken) => {
    try {
        const response = await axiosInstance.get(`/user/${userEmail}`, {
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







export default axiosInstance;



