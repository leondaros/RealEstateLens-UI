import {
  Container,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toggleFavoriteLocation } from "../services/Api";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

const HeroSection = ({ name, locationId }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const isFavorite = user?.favorite_locations?.some(loc => loc.id === locationId);

  const handleToggleFavorite = async () => {
    try {
      if (!user) return;
      const result = await toggleFavoriteLocation(user.id, locationId);
      console.log('Toggling favorite for location:', locationId, 'Result:', result);
      dispatch(setUser(result)); // Update user state with new favorite locations
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
      </Container>
    </Box>
  );
};

export default HeroSection;