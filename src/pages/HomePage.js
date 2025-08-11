import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Autocomplete,
  CircularProgress
} from '@mui/material';
import MainAppBar from '../components/MainAppBar';
import { getLocationByName } from '../services/Api';
import { useNavigate } from 'react-router-dom';
import { addToRecentLocations } from '../utils/locationUtils';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [recentLocations, setRecentLocations] = useState([]);

  const navigate = useNavigate();
  const user = useSelector(state => state.user.data);
  const favoriteLocations = user?.favorite_locations || [];

  const handleSearchInputChange = async (event, value, reason) => {
    setSearchInput(value);
    setSelectedLocation(null);
    if (value && value.length >= 3) {
      setLoading(true);
      try {
        const results = await getLocationByName(value);
        setOptions(results || []);
      } catch (e) {
        setOptions([]);
      }
      setLoading(false);
    } else {
      setOptions([]);
    }
  };

  const handleLocationSelect = (event, value) => {
    setSelectedLocation(value);
    if (value && value.id) {
      const updatedRecent = addToRecentLocations(value);
      setRecentLocations(updatedRecent);
      navigate(`/location/${value.id}`);
    }
  };

  // Add this useEffect to load recent locations when component mounts
  useEffect(() => {
    const loadRecentLocations = () => {
      try {
        const stored = localStorage.getItem('recentLocations');
        if (stored) {
          const recent = JSON.parse(stored);
          setRecentLocations(recent);
        }
      } catch (error) {
        console.warn('Failed to load recent locations:', error);
        setRecentLocations([]);
      }
    };

    // Load initial data
    loadRecentLocations();

    // Update on navigation and tab focus
    window.addEventListener('popstate', loadRecentLocations);
    window.addEventListener('focus', loadRecentLocations);

    // Cleanup listeners
    return () => {
      window.removeEventListener('popstate', loadRecentLocations);
      window.removeEventListener('focus', loadRecentLocations);
    };
  }, []); // Empty dependency array since we want this to run only once on mount

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <MainAppBar locationName={'RealEstateLens'} />
      {/* Hero Section */}
      <Box component="section" sx={{ bgcolor: 'common.white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Discover locations you love or search for new areas.
          </Typography>
          <Box sx={{ display: 'flex', mt: 4 }}>
            <Autocomplete
              freeSolo
              fullWidth
              loading={loading}
              options={options}
              getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
              inputValue={searchInput}
              onInputChange={handleSearchInputChange}
              onChange={handleLocationSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Enter city, neighborhood, or ZIP code"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              disabled={!selectedLocation}
              onClick={() => {
                if (selectedLocation && selectedLocation.id) {
                  navigate(`/location/${selectedLocation.id}`, { state: selectedLocation });
                }
              }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Favorites Section (Saved Locations) */}
      <Box component="section" sx={{ py: 6, bgcolor: 'common.white' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Your Favorite Locations
          </Typography>
          {favoriteLocations.length === 0 ? (
            <Card variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  No favorite locations yet
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Search for locations and save them to your favorites for quick access
                </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                document.querySelector('input[placeholder="Enter city, neighborhood, or ZIP code"]')?.focus();
              }}
            >
              Start Exploring
            </Button>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={4}>
              {favoriteLocations.map((loc) => (
                <Grid item xs={12} sm={6} md={4} key={loc.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {loc.name}
                      </Typography>
                      <Button size="small" onClick={() => navigate(`/location/${loc.id}`)}>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Recent Locations Section */}
      <Box component="section" sx={{ py: 6, bgcolor: 'common.white' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Recently Viewed Locations
          </Typography>
          <Grid container spacing={4}>
            {recentLocations.map((loc) => (
              <Grid item xs={12} sm={6} md={4} key={loc.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {loc.name}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => navigate(`/location/${loc.id}`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'grey.100', py: 4, mt: 6 }}>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            © 2025 RealEstateLens. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
