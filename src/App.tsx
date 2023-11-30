import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes";
import { CssVarsProvider } from "@mui/joy";
import theme from "./theme";
import { Provider } from "react-redux";
import { store } from "./store";
import dotenv from "dotenv";

function App() {
  return (
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <AppRoutes />
      </CssVarsProvider>
    </Provider>
  )
}

export default App;
