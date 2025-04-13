import React from "react";
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  CardMedia,
  Avatar,
  Divider,
  Paper
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SecurityIcon from "@mui/icons-material/Security";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";

const LocationDetails = ({ name, population, costOfLiving, safetyIndex, qualityOfLife }) => (
  <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
    <Grid item xs={12}>
      <Typography variant="h4" gutterBottom>
        {name} Overview
      </Typography>
    </Grid>
    {[{ label: "Population", value: population.toLocaleString() },
      { label: "Cost of Living", value: `${costOfLiving} / 10` },
      { label: "Safety Index", value: `${safetyIndex} / 10` },
      { label: "Quality of Life", value: `${qualityOfLife} / 10` }].map((item, idx) => (
      <Grid item xs={12} sm={6} md={3} key={idx}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6">{item.label}</Typography>
            <Typography variant="body1">{item.value}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const LocationCard = ({ name, rating, safety, averagePrice, imageUrl }) => (
  <Card sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: 2 }} elevation={1}>
    <CardMedia
      component="img"
      image={imageUrl}
      alt={name}
      sx={{ width: 100, height: 100, borderRadius: 2, mr: 2 }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        <Box display="flex" alignItems="center" gap={0.5}>
          <LocationCityIcon fontSize="small" />
          <Typography variant="body2">Rating: {rating}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <SecurityIcon fontSize="small" />
          <Typography variant="body2">Safety: {safety}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <AttachMoneyIcon fontSize="small" />
          <Typography variant="body2">Avg. Price: ${averagePrice}</Typography>
        </Box>
      </Box>
    </CardContent>
    <Button variant="outlined">Compare</Button>
  </Card>
);

const LocationsList = ({ locations }) => (
  <Grid container spacing={3} sx={{ mt: 4 }}>
    <Grid item xs={12}>
      <Typography variant="h4" gutterBottom>
        Neighborhoods
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Explore top areas of the city
      </Typography>
    </Grid>
    {locations.map((location) => (
      <Grid item xs={12} sm={6} key={location.name}>
        <LocationCard {...location} />
      </Grid>
    ))}
  </Grid>
);

const HeroSection = ({ name }) => (
  <Box sx={{ bgcolor: "#2E2E2E", color: "white", py: 8, textAlign: "center" }}>
    <Container maxWidth="md">
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        {name}
      </Typography>
      <TextField
        fullWidth
        placeholder="Looking for your favorite Neighborhood"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mt: 3, bgcolor: "white", borderRadius: 5, boxShadow: 1 }}
      />
    </Container>
  </Box>
);

const LocationPage = () => {
  const locationData = {
    name: "Garopaba",
    population: 35000,
    costOfLiving: 7,
    safetyIndex: 6,
    qualityOfLife: 8,
  };

  const locations = [
    { name: "Gamboa", rating: 4, safety: 2, averagePrice: 10000, imageUrl: "https://via.placeholder.com/100" },
    { name: "Centro", rating: 3, safety: 4, averagePrice: 12000, imageUrl: "https://via.placeholder.com/100" },
    { name: "Praia da Ferrugem", rating: 5, safety: 3, averagePrice: 15000, imageUrl: "https://via.placeholder.com/100" }
  ];

  return (
    <Box>
      <HeroSection name={locationData.name} />
      <Container maxWidth="lg">
        <LocationDetails {...locationData} />
        <LocationsList locations={locations} />
      </Container>
    </Box>
  );
};

export default LocationPage;
