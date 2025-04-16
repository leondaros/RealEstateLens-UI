import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
} from "@mui/material";
import HeroSection from "../components/HeroSection";
import LocationsList from "../components/LocationList";
import { getLocations, getLocationbyId } from "../services/Api";

const LocationPage = () => {
  const [locationData, setLocationData] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationResponse = await getLocationbyId(2); // Fetch main location data
        const locationsResponse = await getLocations(); // Fetch list of locations
        setLocationData(locationResponse);
        setLocations(locationsResponse);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchData();
  }, []);

  if (!locationData) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  return (
    <Box>
      <HeroSection name={locationData.name} />
      <Container maxWidth="lg">
        <LocationsList locations={locations} />
      </Container>
    </Box>
  );
};

export default LocationPage;
