import axios from 'axios';


const API_URL = '/himalayanbus';


// -------------------------- function to log in a user ------------------------------------
function loginUser(email, password) {

    let sessionKey;

    return axios.post(`${API_URL}/user/login`, { email, password })
        .then(response => {
            if (response.status === 200) {
                sessionKey = response.data.sessionKey;
                return sessionKey;
            } else {
                throw new Error('Login failed');
            }
        });
}



// -------------------------- function to log out a user --------------------------
function logoutUser(sessionKey) {
    return axios.post(`${API_URL}/user/logout?key=${sessionKey}`)
        .then(response => {
            if (response.status === 200) {
                return 'User logged out successfully.';
            } else {
                throw Error('Logout failed');
            }
        });
}

export { loginUser, logoutUser };
