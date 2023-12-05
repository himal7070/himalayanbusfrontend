import { toast } from 'react-toastify';

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userRoles');
        toast.success('You are Logged out successfully!', {
            position: 'top-right',
        });
        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    };

    handleLogout();

    return null;
};

export default Logout;
