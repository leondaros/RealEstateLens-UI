import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import { getLatLngsFromGeometry, getPolygonBounds, FitBounds } from "../utils/geometryUtils";
import MapLegend from '../components/MapLegend';

function getSublocationStats(locationData, sub_locations, propertyType, priceRange) {
  const test = sub_locations && sub_locations.length ? sub_locations : [locationData];
  return test.map(subloc => {
    // Filter properties by type and price range
    let filteredProps = Array.isArray(subloc.properties)
      ? subloc.properties.filter(prop => {
        const matchesType = propertyType === 'all' || prop.type === propertyType;
        const price = prop.price || prop.price_value || prop.valor || 0;
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
        return matchesType && matchesPrice;
      })
      : [];
    // Calculate average price for filtered properties
    let avg = 0;
    if (filteredProps.length > 0) {
      const sum = filteredProps.reduce((acc, prop) => {
        const price = prop.price || prop.price_value || prop.valor || 0;
        return acc + price;
      }, 0);
      avg = sum / filteredProps.length;
    }
    return {
      ...subloc,
      count: avg,
      filteredProperties: filteredProps
    };
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
  const [appliedFilters, setAppliedFilters] = useState({
    priceRange: [0, 5000000],
    propertyType: 'all'
  });
  const [tempFilters, setTempFilters] = useState({
    priceRange: [0, 5000000],
    propertyType: 'all'
  });

  const stats = getSublocationStats(
    locationData,
    sub_locations,
    appliedFilters.propertyType,
    appliedFilters.priceRange
  );

  const counts = stats.map(s => s.count);
  const latlngs = getLatLngsFromGeometry(locationData.geometry);
  const bounds = latlngs.length ? getPolygonBounds(latlngs) : null;

  // Define percentiles you want (e.g., quartiles: 20%, 40%, 60%, 80%)
  const percentiles = [0.2, 0.4, 0.6, 0.8];
  const breaks = getPercentileBreaks(counts, percentiles);
  const colors = ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'];

  const handlePriceChange = (type) => (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const numValue = parseInt(value) || 0;

    setTempFilters(prev => ({
      ...prev,
      priceRange: type === 'min'
        ? [numValue, prev.priceRange[1]]
        : [prev.priceRange[0], numValue]
    }));
  };

  const formatPrice = (value) => {
    return value.toLocaleString('pt-BR');
  };

  const handlePropertyTypeChange = (event) => {
    setTempFilters(prev => ({
      ...prev,
      propertyType: event.target.value
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(tempFilters);
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold', mb: 3 }} gutterBottom>
          Análise de Preços Imobiliários
        </Typography>

        <Paper id="price-map-filter" sx={{ p: 4, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Preço Mínimo"
                    value={tempFilters.priceRange[0]}
                    onChange={handlePriceChange('min')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Preço Máximo"
                    value={tempFilters.priceRange[1]}
                    onChange={handlePriceChange('max')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel>Tipo de Imóvel</InputLabel>
                <Select
                  value={tempFilters.propertyType}
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
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleApplyFilters}
                sx={{ mt: 2 }}
              >
                Aplicar Filtros
              </Button>
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
                <FitBounds bounds={[...bounds]} options={{ padding: [0, 0] }} />
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
              <MapLegend breaks={breaks} colors={colors} title="Preço Médio" />
            </MapContainer>
          </Box>
        </Paper>

        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
          Estatísticas dos Bairros
        </Typography>

        <Grid container spacing={3}>
          {stats.map((subloc, index) => (
            <Grid item xs={12} md={6} lg={4} key={subloc.id || index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {subloc.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Preço médio:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {subloc.count
                        ? `R$ ${Number(subloc.count).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
                        (${subloc.filteredProperties.length} imóveis)`
                        : '-'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Imóveis disponíveis:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {subloc.filteredProperties
                        ? subloc.filteredProperties.length
                        : (subloc.properties && Array.isArray(subloc.properties)
                          ? subloc.properties.length
                          : '-')}
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
