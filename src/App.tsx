import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes";
import { CssVarsProvider } from "@mui/joy";
import theme from "./theme";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import dotenv from "dotenv";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  console.log(process.env.NODE_ENV, "process.env.NODE_ENV");
  console.log(
    process.env.REACT_APP_BACKEND_URL,
    "process.env.REACT_APP_BACKEND_URL"
  );
  console.log(
    process.env.REACT_APP_STRIPE_KEY,
    "process.env.REACT_APP_STRIPE_KEY"
  );
  console.log(
    process.env.REACT_APP_GOOGLE_MAPS_API,
    "process.env.REACT_APP_GOOGLE_MAPS_API"
  );
  console.log(process.env.REACT_APP_ENV, "process.env.REACT_APP_ENV");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
