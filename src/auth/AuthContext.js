import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from 'react';
import { useDispatch } from 'react-redux';
import { setUser as setUserRedux, clearUser } from '../slices/userSlice';
import { loginUser, refreshToken, getUsersId } from '../services/Api';

const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user'
};

const REFRESH_INTERVAL = 4 * 60 * 1000; // 4 minutos

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
  const [user, setUser] = useState(() => getStoredValue(STORAGE_KEYS.USER));

  const dispatch = useDispatch();

  const updateStorage = useCallback((key, value) => {
    if (value) {
      const storageValue = typeof value === 'object' ? JSON.stringify(value) : value;
      localStorage.setItem(key, storageValue);
    } else {
      localStorage.removeItem(key);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);

    Object.values(STORAGE_KEYS).forEach((key) => updateStorage(key, null));
    dispatch(clearUser());
  }, [updateStorage, dispatch]);

  const handleRefreshToken = useCallback(async () => {
    if (!refreshTokenValue) return;

    try {
      const response = await refreshToken(refreshTokenValue);
      setToken(response.access);
      updateStorage(STORAGE_KEYS.TOKEN, response.access);
    } catch (error) {
      logout();
    }
  }, [refreshTokenValue, updateStorage, logout]);

  useEffect(() => {
    const intervalId = setInterval(handleRefreshToken, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [handleRefreshToken]);

  const login = useCallback(async (username, password) => {
    const response = await loginUser(username, password);
    setToken(response.access);
    setRefreshToken(response.refresh);
    
    const userData = await getUsersId(response.user.id);
    setUser(userData);

    updateStorage(STORAGE_KEYS.TOKEN, response.access);
    updateStorage(STORAGE_KEYS.REFRESH_TOKEN, response.refresh);
    updateStorage(STORAGE_KEYS.USER, userData);

    dispatch(setUserRedux(userData));
  }, [updateStorage, dispatch]);

  const authState = {
    token,
    user,
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