import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const MainAppBar = ({ locationName = 'Garopaba' }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'white' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component="div" 
          onClick={() => navigate('/')}
          sx={{ 
            fontWeight: 'bold', 
            fontSize: '1.75rem',
            cursor: 'pointer'
          }}
        >
          {locationName}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {user ? (
            <>
              <Typography sx={{ alignSelf: 'center' }}>
                {user.username}
              </Typography>
              <Button 
                variant="outlined" 
                color="inherit" 
                onClick={logout}
                sx={{ borderRadius: 2 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outlined" 
                color="inherit" 
                onClick={() => navigate('/login')}
                sx={{ borderRadius: 2 }}
              >
                Sign in
              </Button>
              <Button 
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{ 
                  borderRadius: 2, 
                  backgroundColor: '#222', 
                  '&:hover': { backgroundColor: '#000' }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;