import React, { useState } from 'react';
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

// Sample data - replace with API or context-driven data
const popularLocations = ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Miami, FL'];
const greenCities = ['Portland, OR', 'Copenhagen, Denmark', 'Vancouver, Canada', 'Amsterdam, NL'];
const favoriteLocations = ['Seattle, WA', 'Denver, CO', 'Boston, MA'];

export default function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

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
      navigate(`/location/${value.id}`, { state: value });
    }
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <MainAppBar locationName={'RealStateLens'} />
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
          <Grid container spacing={4}>
            {favoriteLocations.map((loc) => (
              <Grid item xs={12} sm={6} md={4} key={loc}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {loc}
                    </Typography>
                    <Button size="small">View Details</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Most Researched Section */}
      <Box component="section" sx={{ py: 6 }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Most Researched Locations
          </Typography>
          <Grid container spacing={4}>
            {popularLocations.map((loc) => (
              <Grid item xs={12} sm={6} md={3} key={loc}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {loc}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Popular searches in {loc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Most Green Cities Section */}
      <Box component="section" sx={{ py: 6, bgcolor: 'common.white' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Top Green Cities
          </Typography>
          <Grid container spacing={4}>
            {greenCities.map((city) => (
              <Grid item xs={12} sm={6} md={3} key={city}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {city}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Known for sustainability and green living
                    </Typography>
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
