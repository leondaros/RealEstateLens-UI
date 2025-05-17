import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Box,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toggleFavoriteLocation } from "../services/Api";

const HeroSection = ({ name, locationId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = async () => {
    try {
      // TODO: Get actual userId from authentication context
      const userId = '1'; // temporary hardcoded user ID
      console.log('Toggling favorite for user:', userId, 'location:', locationId);
      await toggleFavoriteLocation(userId, locationId);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: "#2E2E2E", color: "white", py: 8, textAlign: "center" }}>
      <Container maxWidth="md">
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            {name}
          </Typography>
          <IconButton 
            onClick={handleToggleFavorite}
            sx={{ color: isFavorite ? 'red' : 'white' }}
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Box>
        <TextField
          fullWidth
          placeholder="Looking for your favorite Neighborhood"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 3, bgcolor: "white", borderRadius: 5, boxShadow: 1 }}
        />
      </Container>
    </Box>
  );
};

export default HeroSection;