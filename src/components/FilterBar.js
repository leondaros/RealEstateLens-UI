// FiltersBar.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';

export default function FiltersBar({ priceRange, onPriceChange, propertyType, onPropertyTypeChange }) {
  const marks = [
    { value: 0, label: 'R$ 0' },
    { value: 1e6, label: 'R$ 1M' },
    { value: 2e6, label: 'R$ 2M' },
    { value: 3e6, label: 'R$ 3M' },
  ];

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ mb: 4 }}>
      <Toolbar sx={{ width: '100%', maxWidth: 'xl', mx: 'auto', py: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1" gutterBottom>
              Faixa de Preço (R$)
            </Typography>
            <Slider
              value={priceRange}
              onChange={onPriceChange}
              valueLabelDisplay="auto"
              marks={marks}
              min={0}
              max={3e6}
              step={null}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Tipo de Imóvel</InputLabel>
              <Select
                labelId="type-label"
                value={propertyType}
                label="Tipo de Imóvel"
                onChange={onPropertyTypeChange}
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
      </Toolbar>
    </AppBar>
  );
}
