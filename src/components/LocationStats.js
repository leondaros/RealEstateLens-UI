import React from "react";
import { Card, CardContent, Typography, Stack, Grid } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SecurityIcon from "@mui/icons-material/Security";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const stats = [
  {
    label: "Avaliação",
    icon: <LocationCityIcon color="primary" fontSize="large" />,
    getValue: (props) => props.rating,
  },
  {
    label: "Segurança",
    icon: <SecurityIcon color="success" fontSize="large" />,
    getValue: (props) => props.safety,
  },
  {
    label: "Preço Médio",
    icon: <AttachMoneyIcon color="warning" fontSize="large" />,
    getValue: (props) => `R$ ${props.average_price}`,
  },
];

const LocationStats = ({ name, rating, safety, average_price }) => (
  <>
    <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3 }}>
      {name} - Estatísticas
    </Typography>
    <Grid container spacing={3} justifyContent="center">
      {stats.map((stat, idx) => (
        <Grid item xs={12} sm={4} key={stat.label}>
          <Card sx={{ borderRadius: 2, boxShadow: 4 }}>
            <CardContent>
              <Stack direction="column" alignItems="center" spacing={1}>
                {stat.icon}
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {stat.getValue({ rating, safety, average_price })}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
);

export default LocationStats;