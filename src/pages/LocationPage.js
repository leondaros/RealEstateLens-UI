import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Paper,
  Button,
} from "@mui/material";
import HeroSection from "../components/HeroSection";
import LocationsList from "../components/LocationList";
import LocationStats from "../components/LocationStats";
import LocationReviews from "../components/LocationReviews";
import MainAppBar from "../components/MainAppBar";
import { getLocationDetails } from "../services/Api";
import { useLocation, useParams, Link } from "react-router-dom";
import MapIcon from '@mui/icons-material/Map';
import LayersIcon from '@mui/icons-material/Layers';
import InfoIcon from '@mui/icons-material/Info';
import PriceMap from "./PriceMap";
import PropertyDensity from "./PropertyDensity";
import { useNavigate } from 'react-router-dom';
import { addToRecentLocations } from "../utils/locationUtils";

const LocationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  // Always use navigation state if present, otherwise null
  const [locationData, setLocationData] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // If navigation state is present, use it and never overwrite
    if (location.state) {
      setLocationData(location.state);
      setLoading(false);
      addToRecentLocations(locationData);
      return;
    }
    // Otherwise, fetch from backend using getLocationDetails only
    const fetchData = async () => {
      try {
        const response = await getLocationDetails(id);
        setLocationData(response);
        setLoading(false);
        addToRecentLocations(locationData);
      } catch (error) {
        console.error("Error fetching location data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, location.state, locationData]);

  if (!locationData) {
    return <div>Loading...</div>;
  }

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <MainAppBar locationName={'RealEstateLens'} />
      <HeroSection name={locationData.name} />
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
              rating={locationData.rating}
              commerce={locationData.commerce}
              leisure={locationData.leisure}
              mobility={locationData.mobility}
              education={locationData.education}
              price_per_m2={locationData.price_per_m2}
              price_trend={locationData.price_trend}
            />
            <LocationReviews />
            <Box display="flex" justifyContent="center" mt={4} mb={4}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/location/${id}/contribution`}
                sx={{
                  padding: '12px 24px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '28px',
                  textTransform: 'none',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                Compartilhe sua experiência neste local
              </Button>
            </Box>
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
