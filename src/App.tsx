import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import dotenv from "dotenv";
import { PersistGate } from "redux-persist/integration/react";
import { useTranslation } from "react-i18next";

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  console.log(process.env.REACT_APP_BASE_URL);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
