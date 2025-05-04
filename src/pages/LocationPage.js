import React, { useState, useEffect } from "react";
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
import LocationReviews from "../components/LocationReviews";
import MainAppBar from "../components/MainAppBar";
import { getLocationSubLocations, getLocationbyId } from "../services/Api";
import { useLocation, useParams } from "react-router-dom";
import MapIcon from '@mui/icons-material/Map';
import LayersIcon from '@mui/icons-material/Layers';
import InfoIcon from '@mui/icons-material/Info';
import PriceMap from "./PriceMap";
import PropertyDensity from "./PropertyDensity";

const LocationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  // Always use navigation state if present, otherwise null
  const [locationData, setLocationData] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [locations, setLocations] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    // If navigation state is present, use it and never overwrite
    if (location.state) {
      setLocationData(location.state);
      setLoading(false);
      return;
    }
    // Otherwise, fetch from backend
    const fetchData = async () => {
      try {
        const response = await getLocationbyId(id);
        setLocationData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching location data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, location.state]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getLocationSubLocations(id);
        setLocations(response);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    if (id) {
      fetchLocations();
    }
  }, [id]);

  if (!locationData) {
    return <div>Loading...</div>;
  }

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box>
      <MainAppBar locationName={locationData.name} />
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
              safety={locationData.safety}
              average_price={locationData.average_price}
            />
            <LocationReviews />
            {locations && locations.sub_locations && locations.sub_locations.length > 0 && (
              <LocationsList locations={locations} />
            )}
          </>
        )}

        {tab === 1 && (
          <PriceMap locationId={id} locationData={locationData} sub_locations={locations.sub_locations} />
        )}

        {tab === 2 && (
          <PropertyDensity locationId={id} locationData={locationData} sub_locations={locations.sub_locations}/>
        )}
      </Container>
    </Box>
  );
};

export default LocationPage;
