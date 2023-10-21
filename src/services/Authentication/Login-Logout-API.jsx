import axios from 'axios';


const API_URL = 'http://localhost:8080/himalayanbus';


function login(email, password, role) {
    return axios.post(`${API_URL}/${role}/login`, { email, password })
        .then((response) => {
            if (response.status === 202) {
                window.sessionKey = response.data.sessionKey;
                return window.sessionKey;
            } else {
                throw new Error(`${role} login failed. Invalid credentials or another error occurred.`);
            }
        })
        .catch(() => {
            throw new Error(`${role} login failed. Please check your network connection.`);
        });
}

function logout(sessionKey, role) {
    return axios.post(`${API_URL}/${role}/logout?key=${sessionKey}`)
        .then((response) => {
            if (response.status === 200) {
                return `${role} logged out successfully.`;
            } else {
                throw new Error(`${role} logout failed`);
            }
        })
        .catch((error) => {
            console.error(`Error during ${role} logout:`, error);
            throw error;
        });
}


export { login, logout };






// -------------------------- function to login logout admin --------------------------
//
// function loginAdmin(email, password) {
//     return axios.post(`${API_URL}/admin/login`, { email, password })
//         .then((response) => {
//             if (response.status === 202) {
//                 window.sessionKey = response.data.sessionKey;
//                 return window.sessionKey;
//             } else {
//                 throw new Error('Admin login failed. Invalid credentials or another error occurred.');
//             }
//         })
//         .catch(() => {
//             throw new Error('Admin login failed. Please check your network connection.');
//         });
// }
//
//
// function logoutAdmin(sessionKey) {
//     return axios.post(`${API_URL}/admin/logout?key=${sessionKey}`)
//         .then((response) => {
//             if (response.status === 200) {
//                 return 'Admin logged out successfully.';
//             } else {
//                 throw Error('Admin logout failed');
//             }
//         })
//         .catch((error) => {
//             console.error('Error during admin logout:', error);
//             throw error;
//         });
// }
//
// export { loginAdmin, logoutAdmin };
//
//
//
//
//
// // -------------------------- function to login logout users ------------------------------------
//
//
//
// function loginUser(email, password) {
//     return axios.post(`${API_URL}/user/login`, { email, password })
//         .then((response) => {
//             if (response.status === 202) {
//                 window.sessionKey = response.data.sessionKey;
//                 return window.sessionKey;
//             } else {
//                 throw new Error('Login failed. Invalid credentials or another error occurred.');
//             }
//         })
//         .catch(() => {
//             throw new Error('Login failed. Please check your network connection.');
//         });
// }
//
//
//
// function logoutUser(sessionKey) {
//     return axios.post(`${API_URL}/user/logout?key=${sessionKey}`)
//         .then(function (response) {
//             if (response.status === 200) {
//                 return 'User logged out successfully.';
//             } else {
//                 throw Error('Logout failed');
//             }
//         })
//         .catch(function (error) {
//             console.error('Error during logout:', error);
//             throw error;
//         });
// }
//
// export { loginUser, logoutUser };
//
//
//
//
//
//








//
// function getCookie(name) {
//
//     const cleanedName = name.trim();
//     const value = `; ${document.cookie}`;
//     console.log('All cookies:', value;
//     const parts = value.split(`; ${cleanedName}=`);
//     console.log('Parts:', parts);
//     if (parts.length === 2) {
//         return parts.pop().split(';').shift().trim();
//     }
//     console.log('Session key not found in cookies.');
//
// }
//
// export {getCookie};