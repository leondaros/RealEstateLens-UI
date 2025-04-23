import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  AppBar, 
  Toolbar, 
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Slider,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import ParkIcon from '@mui/icons-material/Park';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MainAppBar from '../components/MainAppBar';

function UserContribution() {
  const [activeStep, setActiveStep] = useState(0);
  const [propertyType, setPropertyType] = useState('apartment');
  const [neighborhood, setNeighborhood] = useState('');
  const [price, setPrice] = useState(1000000);
  const [areas, setAreas] = useState({
    safety: 3,
    transport: 3,
    services: 3,
    leisure: 3,
  });

  const steps = ['Informações Básicas', 'Avaliação do Bairro', 'Confirmação'];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleNeighborhoodChange = (event) => {
    setNeighborhood(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  const handleAreaChange = (area) => (event, newValue) => {
    setAreas((prev) => ({ ...prev, [area]: newValue }));
  };

  const neighborhoods = ['Centro', 'Gamboa', 'Ferrugem', 'Silveira', 'Vigia', 'Praia do Rosa', 'Barra', 'Ibiraquera'];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Imóvel</InputLabel>
                  <Select value={propertyType} onChange={handlePropertyTypeChange}>
                    <MenuItem value="apartment">Apartamento</MenuItem>
                    <MenuItem value="house">Casa</MenuItem>
                    <MenuItem value="land">Terreno</MenuItem>
                    <MenuItem value="commercial">Comercial</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Bairro</InputLabel>
                  <Select value={neighborhood} onChange={handleNeighborhoodChange}>
                    {neighborhoods.map((n) => (
                      <MenuItem key={n} value={n}>{n}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Preço (R$)</Typography>
                <Slider
                  value={price}
                  onChange={handlePriceChange}
                  min={100000}
                  max={5000000}
                  step={50000}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `R$ ${(value/1000).toFixed(0)}K`}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Área (m²)" type="number" inputProps={{ min: 1 }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Quartos" type="number" inputProps={{ min: 0 }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Banheiros" type="number" inputProps={{ min: 0 }} />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>Avalie o bairro {neighborhood}</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <SecurityIcon sx={{ mr: 2 }} />
                  <Typography>Segurança</Typography>
                </Box>
                <Rating value={areas.safety} onChange={handleAreaChange('safety')} size="large" />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <DirectionsTransitIcon sx={{ mr: 2 }} />
                  <Typography>Transporte/Mobilidade</Typography>
                </Box>
                <Rating value={areas.transport} onChange={handleAreaChange('transport')} size="large" />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <StorefrontIcon sx={{ mr: 2 }} />
                  <Typography>Comércio e Serviços</Typography>
                </Box>
                <Rating value={areas.services} onChange={handleAreaChange('services')} size="large" />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ParkIcon sx={{ mr: 2 }} />
                  <Typography>Lazer e Áreas Verdes</Typography>
                </Box>
                <Rating value={areas.leisure} onChange={handleAreaChange('leisure')} size="large" />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Obrigado por contribuir!</Typography>
            <Typography>As informações serão analisadas e utilizadas para melhorar as estatísticas da plataforma.</Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <MainAppBar />
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
          Contribuir com Informações do Bairro
        </Typography>

        <Paper sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>Voltar</Button>
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Avançar'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default UserContribution;
