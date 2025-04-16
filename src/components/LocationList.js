import React from "react";
import {
  Typography,
  Grid,
} from "@mui/material";
import LocationCard from "./LocationCard";

const LocationsList = ({ locations }) => (
  <>
    <Typography variant="h4" gutterBottom>
      Neighborhoods
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      Explore top areas of the city
    </Typography>
    <Grid container spacing={3} sx={{ mt: 2 }} justifyContent="center">
      {locations.map((location) => (
        <Grid item xs={12} sm={6} md={4} key={location.name}>
          <LocationCard {...location} />
        </Grid>
      ))}
    </Grid>
  </>
);

export default LocationsList;

