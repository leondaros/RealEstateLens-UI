import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  AppBar, 
  Toolbar, 
  Button,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LayersIcon from '@mui/icons-material/Layers';
import InfoIcon from '@mui/icons-material/Info';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const MapPlaceholder = () => (
  <Box 
    sx={{ 
      height: 500, 
      backgroundColor: '#e0e0e0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
      <Box sx={{ position: 'absolute', top: '20%', left: '10%', width: '25%', height: '30%', backgroundColor: '#3f51b5', opacity: 0.4, borderRadius: 2 }} />
      <Box sx={{ position: 'absolute', top: '15%', left: '40%', width: '20%', height: '40%', backgroundColor: '#673ab7', opacity: 0.5, borderRadius: 2 }} />
      <Box sx={{ position: 'absolute', top: '60%', left: '15%', width: '30%', height: '25%', backgroundColor: '#2196f3', opacity: 0.3, borderRadius: 2 }} />
      <Box sx={{ position: 'absolute', top: '30%', left: '65%', width: '25%', height: '50%', backgroundColor: '#f44336', opacity: 0.4, borderRadius: 2 }} />
      <Box sx={{ position: 'absolute', top: '10%', right: '10%', width: '15%', height: '15%', backgroundColor: '#ff9800', opacity: 0.5, borderRadius: 2 }} />
      <Box sx={{ position: 'absolute', bottom: '10%', right: '20%', width: '30%', height: '20%', backgroundColor: '#4caf50', opacity: 0.4, borderRadius: 2 }} />
    </Box>
    <Typography variant="h6" color="text.secondary" sx={{ zIndex: 1 }}>
      Mapa de Preços por Bairro
    </Typography>
  </Box>
);

function PriceMap() {
  const [mapType, setMapType] = useState(0);
  const [priceRange, setPriceRange] = useState([500000, 2000000]);
  const [propertyType, setPropertyType] = useState('all');

  const handleMapTypeChange = (event, newValue) => {
    setMapType(newValue);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.75rem' }}>
            Garopaba
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit">Dashboard</Button>
            <Button color="inherit" variant="outlined">Mapas</Button>
            <Button color="inherit">Bairros</Button>
            <Button color="inherit">Análises</Button>
            <Button color="inherit">Contribuir</Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" color="inherit" sx={{ borderRadius: 2 }}>
              Sign in
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                borderRadius: 2, 
                backgroundColor: '#222', 
                '&:hover': { backgroundColor: '#000' }
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Análise de Preços Imobiliários
        </Typography>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={mapType}
            onChange={handleMapTypeChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab icon={<AttachMoneyIcon />} label="Preço Médio" />
            <Tab icon={<LayersIcon />} label="Densidade de Ofertas" />
            <Tab icon={<InfoIcon />} label="Insights" />
          </Tabs>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography gutterBottom>Faixa de Preço (R$)</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={5000000}
                step={50000}
                valueLabelFormat={(value) => `R$ ${(value/1000).toFixed(0)}K`}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  R$ {(priceRange[0]/1000).toFixed(0)}K
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  R$ {(priceRange[1]/1000).toFixed(0)}K
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
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
          </Grid>
        </Paper>

        <Paper sx={{ mb: 3, overflow: 'hidden' }}>
          <MapPlaceholder />
        </Paper>

        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
          Estatísticas dos Bairros
        </Typography>

        <Grid container spacing={3}>
          {['Centro', 'Gamboa', 'Ferrugem', 'Silveira', 'Vigia'].map((neighborhood, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {neighborhood}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Preço médio:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      R$ {(Math.random() * 1000000 + 500000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Imóveis disponíveis:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {Math.floor(Math.random() * 50 + 10)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Variação (3 meses):
                    </Typography>
                    <Typography 
                      variant="body2" 
                      fontWeight="bold" 
                      color={Math.random() > 0.5 ? 'success.main' : 'error.main'}
                    >
                      {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 5).toFixed(1)}%
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
