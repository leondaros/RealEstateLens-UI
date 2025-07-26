import { Card, CardContent, Typography, Stack, Grid, Box } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ParkIcon from "@mui/icons-material/Park";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; // Corrigido ícone
import { Skeleton } from "@mui/material";

const stats = [
  {
    label: "Comércio e Serviços",
    icon: <StorefrontIcon sx={{ color: "#1976d2" }} fontSize="large" />,
    key: "commerce",
    color: "#e3f2fd"
  },
  {
    label: "Lazer e Áreas Verdes",
    icon: <ParkIcon sx={{ color: "#43a047" }} fontSize="large" />,
    key: "leisure",
    color: "#e8f5e9"
  },
  {
    label: "Mobilidade",
    icon: <DirectionsTransitIcon sx={{ color: "#fbc02d" }} fontSize="large" />,
    key: "mobility",
    color: "#fffde7"
  },
  {
    label: "Educação",
    icon: <SchoolIcon sx={{ color: "#8e24aa" }} fontSize="large" />,
    key: "education",
    color: "#ede7f6"
  },
  {
    label: "Saúde",
    icon: <LocalHospitalIcon sx={{ color: "#d81b60" }} fontSize="large" />,
    key: "health",
    color: "#fce4ec"
  },
  {
    label: "Preço por m²",
    icon: <MonetizationOnIcon sx={{ color: "#009688" }} fontSize="large" />,
    key: "price_per_m2",
    color: "#e0f2f1"
  },
  {
    label: "Tendência de Preço",
    icon: <TrendingUpIcon sx={{ color: "#388e3c" }} fontSize="large" />,
    key: "price_trend",
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
  health,
  price_per_m2,
  price_trend,
  median_price
}) => {
  const props = {
    name,
    rating,
    safety,
    average_price,
    commerce,
    leisure,
    mobility,
    education,
    health,
    price_per_m2,
    price_trend,
    median_price
  };

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
        {name} - Estatísticas
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={4} key={stat.label} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ borderRadius: 3, boxShadow: 4, bgcolor: stat.color, width: 300 }}>
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
                  {/* Verifica se a propriedade existe e não é nula antes de renderizar */}
                  {props[stat.key] !== undefined && props[stat.key] !== null ? (
                    <Typography variant="h6" fontWeight="bold" align="center">
                      {props[stat.key]}
                    </Typography>
                  ) : (
                    <Skeleton 
                      variant="text" 
                      width={60} 
                      height={32} 
                      sx={{ mt: 1, mb: 1 }} 
                    />
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default LocationStats;