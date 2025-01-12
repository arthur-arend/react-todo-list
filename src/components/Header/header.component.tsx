import { Container, Typography } from "@mui/material";
import React from "react";

export const Header: React.FC = () => {
  return (
    <Container>
      <Typography
        variant="h1"
        sx={{ marginY: 4, textAlign: "center", color: "primary.main" }}
      >
        Lista de Tarefas
      </Typography>
    </Container>
  );
};
