import React from "react";
import { Card, CardContent, Typography, Stack, Grid, Box } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ParkIcon from "@mui/icons-material/Park";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const stats = [
  {
    label: "Comércio e Serviços",
    icon: <StorefrontIcon sx={{ color: "#1976d2" }} fontSize="large" />,
    getValue: (props) => props.commerce ?? props.rating,
    color: "#e3f2fd"
  },
  {
    label: "Lazer e Áreas Verdes",
    icon: <ParkIcon sx={{ color: "#43a047" }} fontSize="large" />,
    getValue: (props) => props.leisure ?? props.rating,
    color: "#e8f5e9"
  },
  {
    label: "Mobilidade",
    icon: <DirectionsTransitIcon sx={{ color: "#fbc02d" }} fontSize="large" />,
    getValue: (props) => props.mobility ?? props.rating,
    color: "#fffde7"
  },
  {
    label: "Saúde e Educação",
    icon: <SchoolIcon sx={{ color: "#8e24aa" }} fontSize="large" />,
    getValue: (props) => props.education ?? props.rating,
    color: "#f3e5f5"
  },
  {
    label: "Preço por m²",
    icon: <MonetizationOnIcon sx={{ color: "#009688" }} fontSize="large" />,
    getValue: (props) => props.price_per_m2 ?? props.safety,
    color: "#e0f2f1"
  },
  {
    label: "Tendência de Preço",
    icon: <TrendingUpIcon sx={{ color: "#388e3c" }} fontSize="large" />,
    getValue: (props) => props.price_trend ?? "+0%",
    color: "#e8f5e9"
  },
];

const LocationStats = ({
  name,
  rating,
  safety,
  average_price,
  commerce,
  leisure,
  mobility,
  education,
  price_per_m2,
  price_trend,
  median_price
}) => (
  <>
    <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
      {name} - Estatísticas
    </Typography>
    <Grid container spacing={3} justifyContent="center">
      {stats.map((stat, idx) => (
        <Grid item xs={12} sm={6} md={4} key={stat.label} sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{
            borderRadius: 3,
            boxShadow: 4,
            bgcolor: stat.color,
            height: "100%",
            width: 300, // largura fixa
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <CardContent>
              <Stack direction="column" alignItems="center" spacing={1}>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: "#fff",
                  boxShadow: 1,
                  mb: 1
                }}>
                  {stat.icon}
                </Box>
                <Typography variant="subtitle1" color="text.secondary" align="center">
                  {stat.label}
                </Typography>
                <Typography variant="h6" fontWeight="bold" align="center">
                  {stat.getValue({
                    rating,
                    safety,
                    average_price,
                    commerce,
                    leisure,
                    mobility,
                    education,
                    price_per_m2,
                    price_trend,
                    median_price
                  })}
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