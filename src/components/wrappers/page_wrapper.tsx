import React from "react";
import NavigationBar from "../navigation";
import { Box, CssVarsProvider } from "@mui/joy";
import EventList from "../events/list";
import PALLETTE from "../../theme/pallette";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "../../theme";
import Footer from "./footer";
interface TesseraWrapperProps {
  children: React.ReactNode;
}

const TesseraWrapper: React.FC<TesseraWrapperProps> = ({ children }) => {
  return (
    <CssVarsProvider theme={theme}>
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
        sx={{ width: "100%", minHeight: "100vh" }}
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
    </CssVarsProvider>
  );
};

export default TesseraWrapper;
