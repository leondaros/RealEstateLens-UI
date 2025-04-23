import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainAppBar = ({ locationName = 'Garopaba' }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'white' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1.75rem' }}>
          {locationName}
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/location')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/location/prices')}>Preços</Button>
          <Button color="inherit" onClick={() => navigate('/location/density')}>Densidade</Button>
          <Button color="inherit" onClick={() => navigate('/feedback')}>Contribuir</Button>
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
  );
};

export default MainAppBar;
