import React from "react";
import { Card, CardContent, Typography, Avatar, Grid, Stack, Rating } from "@mui/material";

const reviews = [
  {
    name: "Ana Souza",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    comment: "Ótimo lugar para morar, seguro e com boa infraestrutura.",
  },
  {
    name: "Carlos Lima",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    comment: "Adoro o bairro, muito tranquilo e perto de tudo.",
  },
  {
    name: "Marina Silva",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 3,
    comment: "Poderia ter mais opções de lazer, mas no geral é bom.",
  },
];

const LocationReviews = () => (
  <div>
    <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
      Depoimentos de Moradores
    </Typography>
    <Grid container spacing={3}>
      {reviews.map((review, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                <Avatar src={review.avatar} alt={review.name} />
                <Typography variant="subtitle1">{review.name}</Typography>
              </Stack>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {review.comment}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);

export default LocationReviews;