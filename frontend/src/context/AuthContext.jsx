import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('nexara_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    const res = await authAPI.login(credentials);
    const { token, user: userData } = res.data;
    localStorage.setItem('nexara_token', token);
    localStorage.setItem('nexara_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (data) => {
    const res = await authAPI.register(data);
    const { token, user: userData } = res.data;
    localStorage.setItem('nexara_token', token);
    localStorage.setItem('nexara_user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('nexara_token');
    localStorage.removeItem('nexara_user');
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await authAPI.getMe();
      setUser(res.data.user);
      localStorage.setItem('nexara_user', JSON.stringify(res.data.user));
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
