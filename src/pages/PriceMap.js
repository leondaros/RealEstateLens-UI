import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from "react-leaflet";
import { getLatLngsFromGeometry, getPolygonBounds, FitBounds } from "../utils/geometryUtils";

function getSublocationStats(locationData, sub_locations, propertyType, priceRange) {
  const test = sub_locations!=0 ? sub_locations: [locationData];
  return test.map(subloc => {
    const count = subloc.average_price || 0;
    return { ...subloc, count };
  });
}

function getPercentileBreaks(values, percentiles) {
  if (!values.length) return [];
  const sorted = [...values].sort((a, b) => a - b);
  return percentiles.map(p => {
    const idx = Math.floor(p * (sorted.length - 1));
    return sorted[idx];
  });
}

function getColor(value, breaks, colors) {
  for (let i = 0; i < breaks.length; i++) {
    if (value <= breaks[i]) return colors[i];
  }
  return colors[colors.length - 1];
}

function PriceMap({ locationId, locationData, sub_locations }) {
  const [priceRange, setPriceRange] = useState([0, 200000000000]);
  const [propertyType, setPropertyType] = useState('all');
  const stats = getSublocationStats(locationData, sub_locations, propertyType, priceRange);
  const counts = stats.map(s => s.count);
  const latlngs = getLatLngsFromGeometry(locationData.geometry);
  const bounds = latlngs.length ? getPolygonBounds(latlngs) : null;

  // Define percentiles you want (e.g., quartiles: 20%, 40%, 60%, 80%)
  const percentiles = [0.2, 0.4, 0.6, 0.8];
  const breaks = getPercentileBreaks(counts, percentiles);
  const colors = ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'];

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Análise de Preços Imobiliários
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Faixa de Preço (R$)</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={5000000}
                step={50000}
                valueLabelFormat={(value) => `R$ ${(value/1000).toFixed(0)}K`}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  R$ {(priceRange[0]/1000).toFixed(0)}K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  R$ {(priceRange[1]/1000).toFixed(0)}K
                </Typography>
              </Box>
            </Grid>
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
          </Grid>
        </Paper>

        <Paper sx={{ mb: 3, overflow: 'hidden' }}>
          <Box sx={{ height: 500, width: "100%" }}>
            <MapContainer
              key={JSON.stringify(bounds)}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {bounds && (
                // Example: force new bounds reference
                <FitBounds bounds={[...bounds]} options={{ padding: [0,0]}} />
              )}
              {stats.map((subloc, idx) => {
                const latlngs = getLatLngsFromGeometry(subloc.geometry);
                const color = getColor(subloc.count, breaks, colors);
                return (
                  <Polygon
                    key={subloc.id || idx}
                    positions={latlngs}
                    pathOptions={{ fillColor: color, color: "#333", weight: 2, fillOpacity: 0.7 }}
                  >
                      <Tooltip direction="top" offset={[0, 10]}>
                        <div style={{ fontSize: '1.1rem', minWidth: 120 }}>
                          <strong>{subloc.name}</strong>
                          <br />
                          Preço médio:&nbsp;
                          <span style={{ fontWeight: 600, color: '#1976d2' }}>
                            R$ {Number(subloc.count).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                          </span>
                        </div>
                      </Tooltip>
                  </Polygon>
                );
              })}
            </MapContainer>
          </Box>
        </Paper>

        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
          Estatísticas dos Bairros
        </Typography>

        <Grid container spacing={3}>
          {['Centro', 'Gamboa', 'Ferrugem', 'Silveira', 'Vigia'].map((neighborhood, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {neighborhood}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Preço médio:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      R$ {(Math.random() * 1000000 + 500000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Imóveis disponíveis:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {Math.floor(Math.random() * 50 + 10)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Variação (3 meses):
                    </Typography>
                    <Typography 
                      variant="body2" 
                      fontWeight="bold" 
                      color={Math.random() > 0.5 ? 'success.main' : 'error.main'}
                    >
                      {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 5).toFixed(1)}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default PriceMap;
