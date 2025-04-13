import React, { useState } from "react";
import { Container, TextField, Autocomplete, Card, CardContent, Typography, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Rating, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import NeighborhoodExplorer from "./pages/NeighborhoodExplorer";
import NavBar from './components/NavBar';
import UserContribution from "./pages/UserContribution";
import PropertyDensity from "./pages/PropertyDensity";
import PriceMap from "./pages/PriceMap";
import LocationPage from "./pages/LocationPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar /> {/* Menu de navegação compartilhado */}
      <Routes>
        <Route path="/" element={<NeighborhoodExplorer />} />
        <Route path="/feedback" element={<UserContribution />} />
        <Route path="/density" element={<PropertyDensity />} />
        <Route path="/PriceMap" element={<PriceMap />} />
        <Route path="/Location" element={<LocationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
