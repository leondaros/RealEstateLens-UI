import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  CardActionArea,
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SecurityIcon from "@mui/icons-material/Security";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import { getLatLngsFromGeometry } from "../utils/geometryUtils";
import wellknown from "wellknown";
import { useNavigate } from "react-router-dom";

function getPolygonBounds(latlngs) {
  const allCoords = latlngs.flat(2).filter(coord => Array.isArray(coord) && coord.length === 2);
  let minLat = 90,
    minLng = 180,
    maxLat = -90,
    maxLng = -180;
  allCoords.forEach(([lat, lng]) => {
    minLat = Math.min(minLat, lat);
    minLng = Math.min(minLng, lng);
    maxLat = Math.max(maxLat, lat);
    maxLng = Math.max(maxLng, lng);
  });
  return [
    [minLat, minLng],
    [maxLat, maxLng],
  ];
}

function FitBounds({ bounds }) {
  const map = useMap();
  React.useEffect(() => {
    if (bounds) map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, bounds]);
  return null;
}

const LocationCard = ({ id, name, rating, safety, average_price, geometry }) => {
  const latlngs = getLatLngsFromGeometry(geometry);
  const bounds = latlngs.length ? getPolygonBounds(latlngs) : null;
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/location/${id}`, { 
      state: { 
        name,
        rating,
        safety,
        average_price,
        geometry
      }
    });
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 4, overflow: 'hidden' }}>
      <CardActionArea onClick={handleCardClick}>
        <Box sx={{ height: 200, width: '100%', position: 'relative' }}>
          <MapContainer
            bounds={bounds}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            dragging={false}
            zoomControl={false}
            touchZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {bounds && <FitBounds bounds={bounds} />}
            {latlngs.map((polygon, i) => (
              <Polygon
                key={i}
                positions={polygon}
                pathOptions={{
                  fillColor: '#1976d2',
                  color: '#fff',
                  weight: 2,
                  fillOpacity: 0.6,
                  dashArray: '3',
                }}
              />
            ))}
          </MapContainer>
        </Box>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            {name}
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Stack direction="row" spacing={0.5} alignItems="center">
              <LocationCityIcon />
              <Typography variant="body2">{rating}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <SecurityIcon />
              <Typography variant="body2">{safety}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AttachMoneyIcon />
              <Typography variant="body2">${average_price}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LocationCard;
