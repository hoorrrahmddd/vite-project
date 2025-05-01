// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userId: null,
    role: null,
    isLoggedIn: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({
          userId: decoded.nameid,
          role: decoded.role,
          isLoggedIn: true,
        });
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
