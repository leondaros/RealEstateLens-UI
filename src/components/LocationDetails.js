import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";


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

export default LocationDetails;  