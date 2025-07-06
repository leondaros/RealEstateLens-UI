import React from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { updateFavorites } from "../slices/userSlice";

const HeroSection = ({ name, locationId }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const isFavorite = user?.favorite_locations?.some(loc => loc.id === locationId);

  const handleToggleFavorite = async () => {
    try {
      if (!user) return;
      const result = await toggleFavoriteLocation(user.id, locationId);
      console.log('Toggling favorite for location:', locationId, 'Result:', result);
      if (result && result.favorite_locations) {
        dispatch(updateFavorites(result.favorite_locations));
      } else {
        // fallback: limpa favoritos se a resposta for vazia
        console.warn('No favorite locations returned, resetting favorites.');
        dispatch(updateFavorites([]));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (!user) return null; // Ou um loading, se preferir

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
            disabled={!user}
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