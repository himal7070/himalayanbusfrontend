import { useEffect } from 'react';
import { decodeJwtToken } from './TokenDecoder';
import Logout from './Logout-handle';

// eslint-disable-next-line react/prop-types
const TokenExpirationChecker = ({ children }) => {


  useEffect(() => {
    const checkTokenExpiry = () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.log('Access token not found. Redirecting to login.');
        window.location.href = '/';
        return false;
      }

      const decodedToken = decodeJwtToken(accessToken);
      const tokenExpiry = decodedToken.exp * 1000;
      const expiresInMilliseconds = tokenExpiry - Date.now();

      console.log('Token expiry in milliseconds:', expiresInMilliseconds);

      if (expiresInMilliseconds <= 0) {
        console.log('Token expired. Logging out.');
        Logout();
        window.location.href = '/';
        return false;
      }

      return true;
    };

    checkTokenExpiry();

    const interval = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(interval);
  }, []);


  return <>{children}</>;

};

export default TokenExpirationChecker;
