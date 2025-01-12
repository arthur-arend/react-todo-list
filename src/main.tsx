import React from "react";
import ReactDOM from "react-dom/client";

import { createTheme, ThemeProvider } from "@mui/material";
import { App } from "./App.js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#013387",
    },
    secondary: {
      main: "#2e74c9",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: "600",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "500",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: "500",
    },
  },
});

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
