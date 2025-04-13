import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  AppBar, 
  Toolbar, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const DensityMapPlaceholder = () => (
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
      <Box sx={{ position: 'absolute', top: '30%', left: '20%', width: '20%', height: '20%', background: 'radial-gradient(circle, rgba(255,0,0,0.7) 0%, rgba(255,0,0,0) 70%)', borderRadius: '50%' }} />
      <Box sx={{ position: 'absolute', top: '40%', left: '25%', width: '15%', height: '15%', background: 'radial-gradient(circle, rgba(255,0,0,0.5) 0%, rgba(255,0,0,0) 70%)', borderRadius: '50%' }} />
      <Box sx={{ position: 'absolute', top: '25%', left: '50%', width: '25%', height: '25%', background: 'radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0) 70%)', borderRadius: '50%' }} />
      <Box sx={{ position: 'absolute', top: '60%', left: '40%', width: '20%', height: '20%', background: 'radial-gradient(circle, rgba(255,0,0,0.6) 0%, rgba(255,0,0,0) 70%)', borderRadius: '50%' }} />
      <Box sx={{ position: 'absolute', top: '50%', left: '70%', width: '15%', height: '15%', background: 'radial-gradient(circle, rgba(255,0,0,0.7) 0%, rgba(255,0,0,0) 70%)', borderRadius: '50%' }} />
    </Box>
    <Typography variant="h6" color="text.secondary" sx={{ zIndex: 1 }}>
      Mapa de Densidade de Ofertas
    </Typography>
  </Box>
);

function PropertyDensity() {
  const [viewType, setViewType] = useState(0);
  const [propertyType, setPropertyType] = useState('all');
  const [timeRange, setTimeRange] = useState('3m');

  const handleViewTypeChange = (event, newValue) => {
    setViewType(newValue);
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const densityData = [
    { neighborhood: 'Centro', totalListings: 47, newListings: 12, trend: 'up' },
    { neighborhood: 'Gamboa', totalListings: 36, newListings: 8, trend: 'up' },
    { neighborhood: 'Ferrugem', totalListings: 28, newListings: 5, trend: 'down' },
    { neighborhood: 'Silveira', totalListings: 34, newListings: 9, trend: 'stable' },
    { neighborhood: 'Vigia', totalListings: 23, newListings: 6, trend: 'up' },
  ];

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
          Densidade de Ofertas Imobiliárias
        </Typography>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={viewType}
            onChange={handleViewTypeChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab icon={<LayersIcon />} label="Mapa de Calor" />
            <Tab icon={<TrendingUpIcon />} label="Tendências" />
            <Tab icon={<LocationOnIcon />} label="Por Localidade" />
          </Tabs>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
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
          <DensityMapPlaceholder />
        </Paper>

        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
          Concentração de Imóveis por Bairro
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bairro</TableCell>
                <TableCell align="right">Total de Imóveis</TableCell>
                <TableCell align="right">Novos Anúncios</TableCell>
                <TableCell align="right">Tendência</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {densityData.map((row) => (
                <TableRow key={row.neighborhood}>
                  <TableCell>{row.neighborhood}</TableCell>
                  <TableCell align="right">{row.totalListings}</TableCell>
                  <TableCell align="right">{row.newListings}</TableCell>
                  <TableCell align="right">
                    <Chip 
                      label={row.trend === 'up' ? 'Em alta' : row.trend === 'down' ? 'Em queda' : 'Estável'} 
                      color={row.trend === 'up' ? 'success' : row.trend === 'down' ? 'error' : 'primary'} 
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
          Insights para Corretores
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Oportunidades de Marketing
                </Typography>
                <Typography variant="body2" paragraph>
                  O bairro Centro apresenta a maior concentração de novos anúncios, indicando uma alta atividade de mercado.
                </Typography>
                <Typography variant="body2">
                  Recomendação: Considere campanhas publicitárias localizadas nesta região para maximizar a visibilidade.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Áreas em Expansão
                </Typography>
                <Typography variant="body2" paragraph>
                  Gamboa e Vigia mostram tendência de crescimento constante nos últimos {timeRange === '1m' ? 'mês' : timeRange === '3m' ? '3 meses' : timeRange === '6m' ? '6 meses' : 'ano'}.
                </Typography>
                <Typography variant="body2">
                  Recomendação: Busque novas listagens nestas áreas para aproveitar o interesse crescente.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Análise de Temporalidade
                </Typography>
                <Typography variant="body2" paragraph>
                  Os dados indicam um aumento de 18% na atividade de mercado em comparação com o mesmo período do ano anterior.
                </Typography>
                <Typography variant="body2">
                  Recomendação: Antecipe-se ao crescimento sazonal com estratégias proativas de captação.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PropertyDensity;
