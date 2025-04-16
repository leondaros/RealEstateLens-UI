import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SecurityIcon from "@mui/icons-material/Security";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import wellknown from "wellknown";

const fillBlueOptions = { color: 'blue' };

function getLatLngsFromGeometry(geometry) {
  if (!geometry) return [];
  const parsed = wellknown.parse(geometry);
  if (!parsed) return [];
  if (parsed.type === "Polygon") {
    // Polygon: [ [ [lng, lat], ... ] ]
    return parsed.coordinates.map(ring => ring.map(([lng, lat]) => [lat, lng]));
  } else if (parsed.type === "MultiPolygon") {
    // MultiPolygon: [ [ [ [lng, lat], ... ] ] ]
    return parsed.coordinates.map(polygon => polygon.map(ring => ring.map(([lng, lat]) => [lat, lng])));
  }
  return [];
}

const LocationCard = ({ name, rating, safety, average_price, geometry }) => {
  const latlngs = getLatLngsFromGeometry(geometry);
  return (
    <Card>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Box sx={{ height: 200, width: "100%" }}>
          <MapContainer
            center={[-28.0276, -48.6192]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {latlngs.length > 0 && Array.isArray(latlngs[0][0]) ? (
              // MultiPolygon or Polygon with holes
              latlngs.map((polygon, i) => (
                <Polygon key={i} pathOptions={{ fillColor: 'blue', weight: 2, opacity: 1, color: 'white', dashArray: '3', fillOpacity: 0.9 }} positions={polygon} />
              ))
            ) : null}
          </MapContainer>
        </Box>
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocationCityIcon fontSize="small" />
            <Typography variant="body2">Rating: {rating}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <SecurityIcon fontSize="small" />
            <Typography variant="body2">Safety: {safety}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <AttachMoneyIcon fontSize="small" />
            <Typography variant="body2">Avg. Price: ${average_price}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LocationCard;