import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import LocationCard from "./LocationCard";

const LocationsList = ({ locations }) => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Box textAlign="center" mb={4}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
        Neighborhoods
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Explore top areas of the city
      </Typography>
    </Box>

    <Grid container spacing={4} justifyContent="center">
      {locations.sub_locations && locations.sub_locations.map((location, index) => (
        <Grid
          item
          key={location.id || index}
          xs={12}
          sm={6}
          md={4}
        >
          <LocationCard {...location} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default LocationsList;