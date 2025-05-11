import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import NeighborhoodExplorer from "./pages/NeighborhoodExplorer";
import UserContribution from "./pages/UserContribution";
import PropertyDensity from "./pages/PropertyDensity";
import PriceMap from "./pages/PriceMap";
import LocationPage from "./pages/LocationPage";
import HomePage from './pages/HomePage';

function App() {
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
