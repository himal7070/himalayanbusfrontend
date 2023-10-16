import axios from 'axios';

const API_URL = '/himalayanbus';



// -------------------------- function to sign up a user --------------------------

function signUpUser(user) {
    return axios.post(`${API_URL}/user/signup`, user)
        .then((response) => {
            console.log('User signed up:', response.data);
            return response.data;
        })
        .catch((error) => {
            console.error('Signup failed:', error);
            throw error;
        });
}

export { signUpUser };
