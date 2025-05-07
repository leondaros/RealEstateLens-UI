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
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { getPolygonBounds, FitBounds, getLatLngsFromGeometry } from "../../utils/geometryUtils";
import "./LocationCard.css";

const LocationCard = (props) => {
  const { id, name, rating, safety, average_price, geometry } = props;
  const latlngs = getLatLngsFromGeometry(geometry);
  const bounds = latlngs.length ? getPolygonBounds(latlngs) : null;
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/location/${id}`, { 
      state: { 
        ...props
      }
    });
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 4, overflow: 'hidden', height: 300 }}>
      <CardActionArea onClick={handleCardClick}>
        <Box sx={{ height: 200, width: '100%', position: 'relative' }}>
          <MapContainer
            key={JSON.stringify(bounds)}
            bounds={bounds}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            dragging={false}
            zoomControl={false}
            touchZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {bounds && <FitBounds bounds={bounds} options={{ padding: [0, 0] }}/>}
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
          <Typography className="card-title" variant="h6" align="center" gutterBottom>
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
