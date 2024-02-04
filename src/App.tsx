import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes";
import { CssVarsProvider } from "@mui/joy";
import theme from "./theme";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import dotenv from "dotenv";
import { PersistGate } from "redux-persist/integration/react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  const [key, setKey] = useState(0);

  useEffect(() => {
    // When the language changes, update the key to force a rerender
    setKey((prevKey) => prevKey + 1);
  }, [i18n.language]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes key={key} />
      </PersistGate>
    </Provider>
  );
}

export default App;
