import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({neighborhoods}) => {
  return (
    <MapContainer center={[-23.55052, -46.633308]} zoom={12} style={{ height: "400px", width: "100%", marginTop: "20px" }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {neighborhoods.map((neighborhood, index) => (
      <Marker key={index} position={[neighborhood.lat, neighborhood.lng]}>
        <Popup>
          <strong>{neighborhood.name}</strong><br />
          Preço Médio/m²: {neighborhood.price}
        </Popup>
      </Marker>
    ))}
  </MapContainer>
  );
}
export default Map;