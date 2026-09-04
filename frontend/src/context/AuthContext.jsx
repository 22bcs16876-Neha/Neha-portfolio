import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminService } from '../services/adminService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_token'));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('portfolio_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (arg1, arg2) => {
    setLoading(true);
    try {
      let credentials = {};
      if (typeof arg1 === 'object' && arg1 !== null) {
        credentials = arg1;
      } else if (arg2 !== undefined && arg1 !== undefined) {
        credentials = { username: arg1, password: arg2 };
      } else {
        credentials = { password: arg1 || arg2 };
      }
      const data = await adminService.login(credentials);
      setToken(data.token);
      setUser({
        username: data.username,
        email: data.email,
        role: data.role,
      });
      localStorage.setItem('portfolio_token', data.token);
      localStorage.setItem('portfolio_user', JSON.stringify({
        username: data.username,
        email: data.email,
        role: data.role,
      }));
      return data;
    } finally {
      setLoading(false);
    }
  };

  const loginWithOtp = async (otp, email) => {
    setLoading(true);
    try {
      const data = await adminService.verifyOtp(otp, email);
      setToken(data.token);
      setUser({
        username: data.username,
        email: data.email,
        role: data.role,
      });
      localStorage.setItem('portfolio_token', data.token);
      localStorage.setItem('portfolio_user', JSON.stringify({
        username: data.username,
        email: data.email,
        role: data.role,
      }));
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, loginWithOtp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
