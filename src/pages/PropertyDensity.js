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
  Grid
} from '@mui/material';
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet";
import HeatmapLayer from "../components/HeatmapLayer";
import { getLatLngsFromGeometry, getPolygonBounds, FitBounds } from "../utils/geometryUtils";


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

function PropertyDensity({ id, locationData, sub_locations }) {
  const [propertyType, setPropertyType] = useState('all');
  const [timeRange, setTimeRange] = useState('3m');
  const latlngs = getLatLngsFromGeometry(locationData.geometry);
  const bounds = latlngs.length ? getPolygonBounds(latlngs) : null;

  // Use sub_locations if present and non-empty, otherwise fallback to [locationData]
  const sublocs = (sub_locations && Array.isArray(sub_locations) && sub_locations.length > 0)
    ? sub_locations
    : (locationData ? [locationData] : []);

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  // Collect all property points from sublocations or locationData
  const getHeatmapPoints = () => {
    if (!locationData && sublocs.length === 0) {
      return [];
    }
    let points = [];
    sublocs.forEach((subloc) => {
      if (subloc && subloc.properties && Array.isArray(subloc.properties)) {
        subloc.properties.forEach((prop) => {
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

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Densidade de Ofertas Imobiliárias
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ minWidth: 200 }}>
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
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {bounds && (
                <FitBounds bounds={bounds} options={{ padding: [0,0] }} />
              )}
              {/* Outline sublocations or locationData */}
              {sublocs.map((subloc, idx) => {
                const latlngs = getLatLngsFromGeometry(subloc.geometry);
                if (!latlngs.length) return null;
                return (
                  <Polygon
                    key={subloc.id || idx}
                    positions={latlngs}
                    pathOptions={{
                      fillOpacity: 0,
                      color: "#1976d2",
                      weight: 2,
                      dashArray: "4"
                    }}
                  >
                    <Tooltip direction="top" offset={[0, 10]}>
                      <div style={{ fontSize: '1.1rem', minWidth: 120 }}>
                        <strong>{subloc.name}</strong>
                      </div>
                    </Tooltip>
                  </Polygon>
                );
              })}
              <HeatmapLayer
                fitBoundsOnLoad
                points={getHeatmapPoints()}
                options={{ radius: 80, blur: 15, maxZoom: 17 }}
              />
            </MapContainer>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default PropertyDensity;
