import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Rotas } from "./routes/Rotas";
import { AutenticacoContextProvider, ScreenContextProvider } from "./contexts";
import "./App.css";

export function App() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 341,
        md: 541,
        lg: 769,
        xl: 1536,
      },
    },
    palette: {
      black: {
        main: "#000",
        contrastText: "#FFF",
      },
      red: {
        main: "#C62828",
        contrastText: "#000",
      },
      white: {
        main: "#FFF",
        contrastText: "#000",
      },
      green: {
        main: "#028D15",
        contrastText: "#000",
      },
      yellow: {
        main: "#EBE909",
        contrastText: "#000",
      },
    },
  });

  return (
    <AutenticacoContextProvider>
      <ScreenContextProvider>
        <ThemeProvider theme={theme}>
          <Rotas />
        </ThemeProvider>
      </ScreenContextProvider>
    </AutenticacoContextProvider>
  );
}
