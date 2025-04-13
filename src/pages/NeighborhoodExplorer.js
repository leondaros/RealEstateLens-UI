import React, { useState } from "react";
import { Container, TextField, Autocomplete, Card, CardContent, Typography, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Rating, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const neighborhoods = [
    { name: "Bairro A", price: "R$ 7.500", trend: "+5%", safety: "4", services: "3", lat: -23.55052, lng: -46.633308 },
    { name: "Bairro B", price: "R$ 6.800", trend: "-2%", safety: "3", services: "4", lat: -23.5631, lng: -46.6544 },
    { name: "Bairro C", price: "R$ 6.200", trend: "+3%", safety: "5", services: "4", lat: -23.5701, lng: -46.6452 },
  ];

const NeighborhoodExplorer = (props) => {
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState([]);

    return (
      <Container>
        <Typography variant="h4" gutterBottom>Comparação de Bairros</Typography>
        
        <Autocomplete
          multiple
          options={neighborhoods}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => setSelectedNeighborhoods(newValue)}
          renderInput={(params) => <TextField {...params} label="Selecione bairros..." variant="outlined" fullWidth />}
        />
        
        {selectedNeighborhoods.length > 0 && (
          <>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Bairro</TableCell>
                    <TableCell>Preço Médio/m²</TableCell>
                    <TableCell>Tendência</TableCell>
                    <TableCell>Segurança</TableCell>
                    <TableCell>Serviços</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedNeighborhoods.map((neighborhood, index) => (
                    <TableRow key={index}>
                      <TableCell>{neighborhood.name}</TableCell>
                      <TableCell>{neighborhood.price}</TableCell>
                      <TableCell>{neighborhood.trend}</TableCell>
                      <TableCell><Rating value={parseInt(neighborhood.safety)} readOnly /></TableCell>
                      <TableCell><Rating value={parseInt(neighborhood.services)} readOnly /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            {/* Mapa Interativo */}
            <Typography variant="h5" sx={{ mt: 3 }}>Localização dos Bairros</Typography>
            <MapContainer center={[-23.55052, -46.633308]} zoom={12} style={{ height: "400px", width: "100%", marginTop: "20px" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {selectedNeighborhoods.map((neighborhood, index) => (
                <Marker key={index} position={[neighborhood.lat, neighborhood.lng]}>
                  <Popup>
                    <strong>{neighborhood.name}</strong><br />
                    Preço Médio/m²: {neighborhood.price}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </>
        )}
      </Container>
    );
}

export default NeighborhoodExplorer