import React, { useState } from "react";
import { Container, TextField, Autocomplete, Typography,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Rating} from "@mui/material";
import Map from "../components/Map";

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
            <Map neighborhoods={selectedNeighborhoods}/>
          </>
        )}
      </Container>
    );
}

export default NeighborhoodExplorer