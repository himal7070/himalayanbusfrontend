import axios from 'axios';

const BASE_URL = 'http://localhost:8080/himalayanbus';

const login = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};


const loginWithGoogle = async (googleUserEmail) => {
    try {
        const response = await axios.post(`${BASE_URL}/loginWithGoogle`, {
            googleUserEmail,
        });

        return response.data;
    } catch (error) {
        console.error("Google login error:", error.response ? error.response.data : error.message);
        throw error;
    }

};

export { login, loginWithGoogle };