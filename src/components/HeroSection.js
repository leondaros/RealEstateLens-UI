import React from "react";
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const HeroSection = ({ name }) => (
    <Box sx={{ bgcolor: "#2E2E2E", color: "white", py: 8, textAlign: "center" }}>
      <Container maxWidth="md">
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          {name}
        </Typography>
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

export default HeroSection;