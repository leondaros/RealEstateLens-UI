import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";

const CardButton = ({ title, icon, onClick }) => {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          {icon}
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            Análise detalhada dos preços por região
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default CardButton;