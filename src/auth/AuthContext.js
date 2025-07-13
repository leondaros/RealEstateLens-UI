import { createContext, useState, useContext, useEffect } from 'react';
import { refreshToken } from '../services/Api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [refreshTokenValue, setRefreshToken] = useState(() => localStorage.getItem('refreshToken'));

  useEffect(() => {
    const refreshAuthToken = async () => {
      if (refreshTokenValue) {
        try {
          const response = await refreshToken(refreshTokenValue);
          setToken(response.access);
          localStorage.setItem('token', response.access);
        } catch (error) {
          logout();
        }
      }
    };

    // Refresh token every 4 minutes
    const intervalId = setInterval(refreshAuthToken, 4 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [refreshTokenValue]);

  const login = (userData, accessToken, refreshTokenValue) => {
    setUser(userData);
    setToken(accessToken);
    setRefreshToken(refreshTokenValue);
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshTokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={value}>
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