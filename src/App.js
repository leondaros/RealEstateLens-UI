import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import NeighborhoodExplorer from "./pages/NeighborhoodExplorer";
import UserContribution from "./pages/UserContribution";
import PropertyDensity from "./pages/PropertyDensity";
import PriceMap from "./pages/PriceMap";
import LocationPage from "./pages/LocationPage";
import HomePage from './pages/HomePage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './slices/userSlice';
import { getUsersId } from './services/Api';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Carrega o usuário globalmente ao iniciar o app
    const fetchUser = async () => {
      try {
        // Troque o ID abaixo pelo método real de autenticação
        const userId = 1;
        const userData = await getUsersId(userId);
        dispatch(setUser(userData));
      } catch (error) {
        // fallback mock
        dispatch(setUser({
          id: 1,
          name: 'Usuário Teste',
          favorite_locations: [],
        }));
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
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
