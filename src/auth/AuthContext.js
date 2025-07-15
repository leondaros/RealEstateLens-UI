import { createContext, useState, useContext, useEffect } from 'react';
import { refreshToken } from '../services/Api';

const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user'
};

const REFRESH_INTERVAL = 4 * 60 * 1000; // 4 minutes in milliseconds

const getStoredValue = (key) => {
  try {
    const item = localStorage.getItem(key);
    return key === STORAGE_KEYS.USER ? JSON.parse(item) : item;
  } catch {
    return null;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getStoredValue(STORAGE_KEYS.TOKEN));
  const [refreshTokenValue, setRefreshToken] = useState(() => 
    getStoredValue(STORAGE_KEYS.REFRESH_TOKEN)
  );

  const updateStorage = (key, value) => {
    if (value) {
      const storageValue = typeof value === 'object' ? JSON.stringify(value) : value;
      localStorage.setItem(key, storageValue);
    } else {
      localStorage.removeItem(key);
    }
  };

  const handleRefreshToken = async () => {
    if (!refreshTokenValue) return;

    try {
      const response = await refreshToken(refreshTokenValue);
      setToken(response.access);
      updateStorage(STORAGE_KEYS.TOKEN, response.access);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(handleRefreshToken, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [refreshTokenValue]);

  const login = (accessToken, newRefreshToken) => {
    setToken(accessToken);
    setRefreshToken(newRefreshToken);
    
    updateStorage(STORAGE_KEYS.TOKEN, accessToken);
    updateStorage(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    
    Object.values(STORAGE_KEYS).forEach(key => updateStorage(key, null));
  };

  const authState = {
    token,
    login,
    logout,
    isAuthenticated: Boolean(token)
  };

  return (
    <AuthContext.Provider value={authState}>
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