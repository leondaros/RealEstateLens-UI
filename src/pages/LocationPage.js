import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import HeroSection from "../components/HeroSection";
import LocationsList from "../components/LocationList";
import LocationStats from "../components/LocationStats";
import MainAppBar from "../components/MainAppBar";
import { getLocationDetails, getLocationCommerce, getLocationLeisure, 
  getLocationMobility, getLocationEducationalInstitutions, getLocationHealth} from "../services/Api";
import { useLocation, useParams } from "react-router-dom";
import MapIcon from '@mui/icons-material/Map';
import LayersIcon from '@mui/icons-material/Layers';
import InfoIcon from '@mui/icons-material/Info';
import PriceMap from "./PriceMap";
import PropertyDensity from "./PropertyDensity";
import { addToRecentLocations } from "../utils/locationUtils";
import { formatCurrency } from "../utils/formatUtils";
import LoadingScreen from "../components/LoadingScreen";

const LocationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  // Always use navigation state if present, otherwise null
  const [locationData, setLocationData] = useState(location.state || null);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(!location.state);
  const [tab, setTab] = useState(0);

useEffect(() => {
  // Limpa os dados antigos antes de buscar os novos
  setLocationData(null);
  setStats({});
  setLoading(true);

  if (location.state) {
    setLocationData(location.state);
    setLoading(false);
    addToRecentLocations(location.state);
    return;
  }

  const fetchData = async () => {
    try {
      const response = await getLocationDetails(id);
      setLocationData(response);
      setLoading(false);
      addToRecentLocations(response);
    } catch (error) {
      console.error("Error fetching location data:", error);
      setLoading(false);
    }
  };
  fetchData();
}, [id, location.state]);

useEffect(() => {
  // Evita buscar estatísticas se ainda não temos dados da location
  if (!id) return;

  // Opcional: pode zerar as estatísticas antes da nova busca
  setStats({});

  const fetchAll = async () => {
    try {
      const [commerce, leisure, mobility, education, health] = await Promise.all([
        getLocationCommerce(id),
        getLocationLeisure(id),
        getLocationMobility(id),
        getLocationEducationalInstitutions(id),
        getLocationHealth(id)
      ]);
      setStats({
        commerce: commerce?.length ?? 0,
        leisure: leisure?.length ?? 0,
        mobility: mobility?.length ?? 0,
        education: education?.length ?? 0,
        health: health?.length ?? 0
      });
    } catch (e) {
      console.error("Erro ao buscar estatísticas", e);
    }
  };
  fetchAll();
}, [id]);

  if (loading || !locationData) {
    return <LoadingScreen hint="Buscando informações do local..." />;
  }

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <MainAppBar locationName={'RealEstateLens'} />
      <HeroSection name={locationData.name} locationId={locationData.id} />
      <Container maxWidth="lg">
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab icon={<InfoIcon />} label="Visão Geral" />
            <Tab icon={<MapIcon />} label="Mapa de Preços" />
            <Tab icon={<LayersIcon />} label="Densidade de Ofertas" />
          </Tabs>
        </Paper>

        {tab === 0 && (
          <>
            <LocationStats
              name={locationData.name}
              commerce={stats.commerce}
              leisure={stats.leisure}
              mobility={stats.mobility}
              education={stats.education}
              health={stats.health}
              price_per_m2={formatCurrency(locationData.average_price_per_m2)}
            />
            {locationData && locationData.sub_locations && locationData.sub_locations.length > 0 && (
              <LocationsList locations={locationData} />
            )}
          </>
        )}

        {tab === 1 && (
          <PriceMap locationId={id} locationData={locationData} sub_locations={locationData.sub_locations} />
        )}

        {tab === 2 && (
          <PropertyDensity locationId={id} locationData={locationData} sub_locations={locationData.sub_locations}/>
        )}
      </Container>
    </Box>
  );
};

export default LocationPage;
