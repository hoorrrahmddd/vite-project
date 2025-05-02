import { useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const RefreshTokenHandler = () => {
  useEffect(() => {
    console.log(" RefreshTokenHandler mounted");

    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      if (!token || !refreshToken) {
        console.warn(" Missing token or refreshToken");
        return;
      }
      try {
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000;
        const now = Date.now();
        const remaining = expiry - now;

        console.log(" Remaining time before expiration:", Math.round(remaining / 1000), "seconds");

        if (remaining < 1 * 60 * 1000) {
          console.log(" Token is about to expire. Sending refresh request...");

          axios.post('https://localhost:7037/api/RefreshToken', { refreshToken })
            .then((res) => {
              console.log(' Token refreshed:', res.data.token);
              localStorage.setItem('token', res.data.token);
              console.log(' New token stored in localStorage.');

              if (res.data.refreshToken) {
                localStorage.setItem('refreshToken', res.data.refreshToken);
                console.log(' New refresh token stored in localStorage.');
              }
            })
            .catch((err) => {
              console.error(' Refresh token request failed:', err);
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              
            });
        }
      } catch (err) {
        console.error(' Invalid token format or decoding failed:', err);
      }
    };

    const interval = setInterval(checkTokenExpiration, 60 * 1000); 

    return () => clearInterval(interval);
  }, []);

  return null; 
};

export default RefreshTokenHandler;
