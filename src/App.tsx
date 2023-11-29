import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes";
import { CssVarsProvider } from "@mui/joy";
import theme from "./theme";

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <AppRoutes />
    </CssVarsProvider>
  )
}

export default App;
