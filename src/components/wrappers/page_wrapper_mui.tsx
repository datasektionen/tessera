import React from "react";
import NavigationBar from "../navigation";
import { Box } from "@mui/joy";
import EventList from "../events/list";
import PALLETTE from "../../theme/pallette";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type {} from "@mui/x-data-grid/themeAugmentation";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Footer from "./footer";

interface TesseraWrapperProps {
  children: React.ReactNode;
}

const MUITesseraWrapper: React.FC<TesseraWrapperProps> = ({ children }) => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <NavigationBar />
      <Box
        sx={{ minHeight: "100vh" }}
        id="tessera-wrapper"
        style={{
          backgroundColor: PALLETTE.offWhite,
          overflow: "hidden",
          marginTop: "16px",
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default MUITesseraWrapper;
