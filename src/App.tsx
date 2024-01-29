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
  console.log(process.env.NODE_BASE_URL, "process.env.NODE_BASE_URL");
  console.log(process.env.NODE_BACKEND_URL, "process.env.NODE_BACKEND_URL");
  console.log(process.env.NODE_STRIPE_KEY, "process.env.NODE_STRIPE_KEY");
  console.log(
    process.env.NODE_GOOGLE_MAPS_API,
    "process.env.NODE_GOOGLE_MAPS_API"
  );
  console.log(process.env.TEST, "process.env.TEST");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
