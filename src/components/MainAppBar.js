import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useSelector } from 'react-redux';

const MainAppBar = ({ locationName = 'Garopaba' }) => {
  const navigate = useNavigate();
  const {logout, isAuthenticated } = useAuth();
  // Fix: Select user from state.user instead of entire state
  const user = useSelector(state => state.user);

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate('/login'); // Redirect to login page
  };

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
          {isAuthenticated ? (
            <>
              <Typography sx={{ alignSelf: 'center' }}>
                {user?.data?.username || 'User'}
              </Typography>
              <Button 
                variant="outlined" 
                color="inherit" 
                onClick={handleLogout}
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