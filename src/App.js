import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import NeighborhoodExplorer from "./pages/NeighborhoodExplorer";
import UserContribution from "./pages/UserContribution";
import PropertyDensity from "./pages/PropertyDensity";
import PriceMap from "./pages/PriceMap";
import LocationPage from "./pages/LocationPage";
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import { getUsersId } from './services/Api';
import LoginPage from './pages/LoginPage';
import { useAuth } from './auth/AuthContext';

function App() {
  const dispatch = useDispatch();
  const { user: authUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (authUser && authUser.id) {
        try {
          const userData = await getUsersId(authUser.id);
          dispatch(setUser(userData));
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch(setUser(null));
        }
      } else {
        dispatch(setUser(null));
      }
    };

    fetchUser();
  }, [dispatch, authUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/NeighborhoodExplorer" element={<NeighborhoodExplorer />} />
        <Route path="/location/:id" element={<LocationPage/>} />
        <Route path="/location/:id/prices" element={<PriceMap />} />
        <Route path="/location/:id/density" element={<PropertyDensity />} />
        <Route path="/location/:id/contribution" element={<UserContribution />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
