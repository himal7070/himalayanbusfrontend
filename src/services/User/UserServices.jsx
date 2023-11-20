import axios from 'axios';

const BASE_URL = 'http://localhost:8080/himalayanbus/user';

// Function to add a new user
export const addUser = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/add`, user);
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};


export const viewAllUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/viewAll`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};