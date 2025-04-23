import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { MapContainer, TileLayer } from "react-leaflet";
import HeatmapLayer from "../components/HeatmapLayer";

function PropertyDensity({ id, locationData, sub_locations }) {
  const [propertyType, setPropertyType] = useState('all');
  const [timeRange, setTimeRange] = useState('3m');

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  // Helper to parse "SRID=4326;POINT (lng lat)" to [lat, lng]
  function parsePointWKT(pointStr) {
    if (!pointStr || typeof pointStr !== "string") return null;
    // Remove SRID if present
    const match = pointStr.match(/POINT\s*\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/i);
    if (!match) return null;
    const lng = parseFloat(match[1]);
    const lat = parseFloat(match[2]);
    if (isNaN(lat) || isNaN(lng)) return null;
    return [lat, lng];
  }

  // Collect all property points from sublocations
  const getHeatmapPoints = () => {
    if (!locationData || !sub_locations){
      console.log(locationData)
      console.log(sub_locations) 
      return [];
    }
    let points = [];
    sub_locations.forEach((subloc) => {
      if (subloc.properties && Array.isArray(subloc.properties)) {
        subloc.properties.forEach((prop) => {
          console.log(prop);
          if (propertyType === 'all' || prop.type === propertyType) {
            // Try to get coordinates from Point WKT string
            if (prop.coordinates) {
              const latlng = parsePointWKT(prop.coordinates);
              if (latlng) {
                points.push([...latlng, 1]);
                return;
              }
            }
            // Fallback to latitude/longitude fields if present
            if (prop.latitude && prop.longitude) {
              points.push([prop.latitude, prop.longitude, 1]);
            }
          }
        });
      }
    });
    return points;
  };

  const getMapCenter = () => {
    if (locationData && locationData.center_lat && locationData.center_lng) {
      return [locationData.center_lat, locationData.center_lng];
    }
    return [-28.0278, -48.6192];
  };

  const densityData = [
    { neighborhood: 'Centro', totalListings: 47, newListings: 12, trend: 'up' },
    { neighborhood: 'Gamboa', totalListings: 36, newListings: 8, trend: 'up' },
    { neighborhood: 'Ferrugem', totalListings: 28, newListings: 5, trend: 'down' },
    { neighborhood: 'Silveira', totalListings: 34, newListings: 9, trend: 'stable' },
    { neighborhood: 'Vigia', totalListings: 23, newListings: 6, trend: 'up' },
  ];

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Densidade de Ofertas Imobiliárias
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Imóvel</InputLabel>
                <Select
                  value={propertyType}
                  label="Tipo de Imóvel"
                  onChange={handlePropertyTypeChange}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="apartment">Apartamentos</MenuItem>
                  <MenuItem value="house">Casas</MenuItem>
                  <MenuItem value="land">Terrenos</MenuItem>
                  <MenuItem value="commercial">Comercial</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Período</InputLabel>
                <Select
                  value={timeRange}
                  label="Período"
                  onChange={handleTimeRangeChange}
                >
                  <MenuItem value="1m">Último mês</MenuItem>
                  <MenuItem value="3m">Últimos 3 meses</MenuItem>
                  <MenuItem value="6m">Últimos 6 meses</MenuItem>
                  <MenuItem value="1y">Último ano</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ mb: 3, overflow: 'hidden' }}>
          <Box sx={{ height: 500, width: "100%" }}>
            <MapContainer
              center={getMapCenter()}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <HeatmapLayer
                fitBoundsOnLoad
                points={getHeatmapPoints()}
                options={{ radius: 30, blur: 15, maxZoom: 17 }}
              />
            </MapContainer>
          </Box>
        </Paper>

        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
          Concentração de Imóveis por Bairro
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bairro</TableCell>
                <TableCell align="right">Total de Imóveis</TableCell>
                <TableCell align="right">Novos Anúncios</TableCell>
                <TableCell align="right">Tendência</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {densityData.map((row) => (
                <TableRow key={row.neighborhood}>
                  <TableCell>{row.neighborhood}</TableCell>
                  <TableCell align="right">{row.totalListings}</TableCell>
                  <TableCell align="right">{row.newListings}</TableCell>
                  <TableCell align="right">
                    <Chip 
                      label={row.trend === 'up' ? 'Em alta' : row.trend === 'down' ? 'Em queda' : 'Estável'} 
                      color={row.trend === 'up' ? 'success' : row.trend === 'down' ? 'error' : 'primary'} 
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
          Insights para Corretores
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Oportunidades de Marketing
                </Typography>
                <Typography variant="body2" paragraph>
                  O bairro Centro apresenta a maior concentração de novos anúncios, indicando uma alta atividade de mercado.
                </Typography>
                <Typography variant="body2">
                  Recomendação: Considere campanhas publicitárias localizadas nesta região para maximizar a visibilidade.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Áreas em Expansão
                </Typography>
                <Typography variant="body2" paragraph>
                  Gamboa e Vigia mostram tendência de crescimento constante nos últimos {timeRange === '1m' ? 'mês' : timeRange === '3m' ? '3 meses' : timeRange === '6m' ? '6 meses' : 'ano'}.
                </Typography>
                <Typography variant="body2">
                  Recomendação: Busque novas listagens nestas áreas para aproveitar o interesse crescente.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Análise de Temporalidade
                </Typography>
                <Typography variant="body2" paragraph>
                  Os dados indicam um aumento de 18% na atividade de mercado em comparação com o mesmo período do ano anterior.
                </Typography>
                <Typography variant="body2">
                  Recomendação: Antecipe-se ao crescimento sazonal com estratégias proativas de captação.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PropertyDensity;
